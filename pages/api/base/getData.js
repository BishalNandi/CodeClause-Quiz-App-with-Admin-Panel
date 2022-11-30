const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
import { ObjectId } from "mongodb";
import { getCookie, setCookie } from 'cookies-next';
import clientPromise from "../../../src/mongodb";

export default async function handeler(req, res) {
    try {
        const mongoClient = await clientPromise;
        const db = mongoClient.db("auth");

        const {
            userId,
            quizId,
            sub: userSub,
        } = req.body;

        if (!userId || !quizId) throw new Error("User ID and Quiz ID must be provided");

        const hostUser = await db.collection("users").findOne({ _id: new ObjectId(userId) });
        const hostedQuiz = hostUser?.my_quizes?.find(e => e.id === parseInt(quizId));

        const jwtAuthToken = getCookie('jwtAuthToken', { req, res });
        if (jwtAuthToken) {
            const sub = jwt.verify(jwtAuthToken, process.env.PRIVATE_KEY).sub;
            const user = await db.collection("users").findOne({ sub });

            if (hostUser._id.toString() === user._id.toString()) {

                const participent = await db.collection("users").findOne({ sub: userSub });
                const userData = hostedQuiz?.participents?.find(e => e.sub === userSub);

                let totalScore = 0,
                    scoreAcheived = 0,
                    totalCorrectAnswer = 0;
                const raw = hostedQuiz?.questions?.map((e, i) => {
                    const isCorrectAnswer = e.correctIndex === userData.data[i];
                    totalScore += e.score;

                    if (isCorrectAnswer) {
                        totalCorrectAnswer++;
                        scoreAcheived += e.score;
                    }

                    return {
                        score: isCorrectAnswer ? e.score : 0,
                        isCorrectAnswer,
                    }
                });

                return res.status(200).json({
                    id: hostedQuiz.id,
                    title: hostedQuiz.title,
                    description: hostedQuiz.description,
                    banner: hostedQuiz.banner,
                    totalQuestionsCount: hostedQuiz?.questions?.length,
                    totalScore,
                    quizEnd: true,
                    data: {
                        raw,
                        totalCorrectAnswer,
                        scoreAcheived,
                        answers: userData.data,
                        requestedToRestart: userData.requestedToRestart,
                        requestedForAnswers: userData.requestedForAnswers,
                    },
                    participent: {
                        name: participent.name,
                        email: participent.email,
                        avatar: participent.avatar,
                    }
                });

            } else {
                return res.status(404).json({
                    status: 404,
                    type: "error",
                    message: "Not Authenticated",
                    data: {
                        id: hostedQuiz.id,
                        title: hostedQuiz.title,
                        description: hostedQuiz.description,
                        banner: hostedQuiz.banner,
                    }
                });
            }

        } else {
            return res.status(404).json({
                status: 404,
                type: "error",
                message: "Failed To LoggedIn",
                data: {
                    id: hostedQuiz.id,
                    title: hostedQuiz.title,
                    description: hostedQuiz.description,
                    banner: hostedQuiz.banner,
                }
            });
        }

    } catch (err) {
        console.error(">>===> Error: ", err);
        res.status(500).json({
            status: 500,
            type: "error",
            message: err.message
        });
    }
}