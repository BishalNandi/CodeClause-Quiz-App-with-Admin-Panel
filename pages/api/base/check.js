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
            skip,
            selectedIndex,
        } = req.body;

        if (!userId || !quizId) throw new Error("User ID and Quiz ID must be provided");

        const hostUser = await db.collection("users").findOne({ _id: new ObjectId(userId) });
        const hostedQuiz = hostUser?.my_quizes?.find(e => e.id === parseInt(quizId));

        const jwtAuthToken = getCookie('jwtAuthToken', { req, res });
        if (jwtAuthToken) {
            const sub = jwt.verify(jwtAuthToken, process.env.PRIVATE_KEY).sub;
            const user = await db.collection("users").findOne({ sub });

            if (hostedQuiz?.participents?.find(e => e.sub === sub)) {
                const userData = hostedQuiz?.participents?.find(e => e.sub === sub);

                const response = (hostedQuiz?.questions?.length > userData.data.length) ? await db.collection("users").updateOne(
                    {
                        _id: new ObjectId(userId),
                    },
                    {
                        "$push": {
                            "my_quizes.$[i].participents.$[j].data": skip ? null : parseInt(selectedIndex),
                        },
                        "$set": {
                            "my_quizes.$[i].participents.$[j].sentQuestionIndex": (hostedQuiz?.questions?.length > (userData.sentQuestionIndex + 1)) ? userData.sentQuestionIndex + 1 : userData.sentQuestionIndex
                        }
                    },
                    {
                        arrayFilters: [{
                            "i.id": parseInt(quizId)
                        }, {
                            "j.sub": sub
                        }]
                    }
                ) : null;

                return res.status(200).json((hostedQuiz?.questions?.length > (userData.sentQuestionIndex + 1)) ? ({
                    id: hostedQuiz.id,
                    title: hostedQuiz.title,
                    description: hostedQuiz.description,
                    banner: hostedQuiz.banner,
                    totalQuestionsCount: hostedQuiz?.questions?.length,
                    currentQuestion: {
                        id: hostedQuiz.questions[userData.sentQuestionIndex + 1].id,
                        question: hostedQuiz.questions[userData.sentQuestionIndex + 1].question,
                        type: hostedQuiz.questions[userData.sentQuestionIndex + 1].type,
                        score: hostedQuiz.questions[userData.sentQuestionIndex + 1].score,
                        time: hostedQuiz.questions[userData.sentQuestionIndex + 1].time || 60,
                        options: hostedQuiz.questions[userData.sentQuestionIndex + 1].options,
                    }
                }) : (function () {
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

                    return {
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
                        }
                    }
                })());

            } else {
                const response = await db.collection("users").updateOne(
                    {
                        _id: new ObjectId(userId),
                        "my_quizes.id": parseInt(quizId),
                    },
                    {
                        "$push": {
                            "my_quizes.$.participents": {
                                sub: sub,
                                sentQuestionIndex: 0,
                                requestedToRestart: false,
                                requestedForAnswers: false,
                                data: []
                            }
                        }
                    }
                );

                const response2 = await db.collection("users").updateOne({ sub }, {
                    '$push': {
                        "participated_quizes": {
                            id: hostedQuiz.id,
                            userId: userId,
                            title: hostedQuiz?.title,
                            description: hostedQuiz.description,
                            banner: hostedQuiz.banner,
                            totalQuestionsCount: hostedQuiz?.questions?.length,
                        }
                    }
                });

                console.log(response, response2);

                return res.status(200).json({
                    id: hostedQuiz.id,
                    title: hostedQuiz.title,
                    description: hostedQuiz.description,
                    banner: hostedQuiz.banner,
                    totalQuestionsCount: hostedQuiz?.questions?.length,
                    currentQuestion: {
                        id: hostedQuiz.questions[0].id,
                        question: hostedQuiz.questions[0].question,
                        type: hostedQuiz.questions[0].type,
                        score: hostedQuiz.questions[0].score,
                        time: hostedQuiz.questions[0].time || 60,
                        options: hostedQuiz.questions[0].options,
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
