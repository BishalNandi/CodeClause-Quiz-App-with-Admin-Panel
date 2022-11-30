const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
import { ObjectId } from "mongodb";
import { getCookie, setCookie } from 'cookies-next';
import clientPromise from "../../../src/mongodb";

export default async function handeler(req, res) {
    try {

        const mongoClient = await clientPromise;
        const db = mongoClient.db("auth");

        const jwtAuthToken = getCookie('jwtAuthToken', { req, res });

        if (jwtAuthToken) {
            const sub = jwt.verify(jwtAuthToken, process.env.PRIVATE_KEY).sub;

            db.collection("users").findOne({ sub }).then(async e => {
                if (e) {
                    const new_jwtToken = jwt.sign({ sub: sub }, process.env.PRIVATE_KEY);

                    const data = {
                        ...req.body.data,
                        id: e.my_quizes?.length || 1,
                        participents: [],
                    };

                    const response = await db.collection("users").updateOne({ sub: e.sub }, {
                        "$push": {
                            my_quizes: data
                        }
                    });

                    setCookie('jwtAuthToken', new_jwtToken, { req, res });
                    return res.status(201).json({
                        status: 201,
                        type: "success",
                        message: "Quiz Hosted Successfully",
                        data: {
                            link: `/${e._id.toString()}/${e.my_quizes?.length || 1}`
                        }
                    });

                } else {
                    return res.status(404).json({
                        status: 404,
                        type: "error",
                        message: "Failed To LoggedIn",
                    });
                }
            })

        } else {
            return res.status(404).json({
                status: 404,
                type: "error",
                message: "Failed To LoggedIn",
            });
        }

    } catch (err) {
        console.error(">>===> Error: ", err);
        res.status(500).json({
            status: 500,
            type: "error",
            message: err
        });
    }
}
