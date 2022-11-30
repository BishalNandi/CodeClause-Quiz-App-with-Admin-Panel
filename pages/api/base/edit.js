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
            query,
            data,
        } = req.body;

        if (!userId || !quizId) throw new Error("User ID and Quiz ID must be provided");

        const hostUser = await db.collection("users").findOne({ _id: new ObjectId(userId) });
        const hostedQuiz = hostUser?.my_quizes?.find(e => e.id === parseInt(quizId));

        const jwtAuthToken = getCookie('jwtAuthToken', { req, res });
        if (jwtAuthToken) {
            const sub = jwt.verify(jwtAuthToken, process.env.PRIVATE_KEY).sub;
            const user = await db.collection("users").findOne({ sub });

            if (hostUser._id.toString() === user._id.toString()) {

                if (query === "get") {
                    res.status(200).json({
                        data: hostedQuiz
                    });
                } else {
                    const response = await db.collection("users").updateOne(
                        {
                            _id: new ObjectId(userId),
                            "my_quizes.id": parseInt(quizId),
                        },
                        {
                            "$set": {
                                "my_quizes.$.title": data.title,
                                "my_quizes.$.description": data.description,
                                "my_quizes.$.banner": data.banner,
                                "my_quizes.$.questions": data.questions,
                            }
                        }
                    )

                    res.status(200).json({
                        status: 200,
                        type: "success",
                        message: "Quiz Edited Successfully"
                    });
                }

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