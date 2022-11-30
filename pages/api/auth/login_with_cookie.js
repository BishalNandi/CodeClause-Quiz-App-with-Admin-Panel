import { setCookie, getCookie } from 'cookies-next';
import clientPromise from '../../../src/mongodb';
const jwt = require('jsonwebtoken');

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

                    setCookie('jwtAuthToken', new_jwtToken, { req, res });
                    return res.status(200).json({
                        status: 200,
                        type: "success",
                        message: "Successfully LoggedIn",
                        data: {
                            id: e._id.toString(),
                            name: e.name,
                            email: e.email,
                            avatar: e.avatar,
                            my_quizes: e.my_quizes,
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
        return res.status(500).json({
            status: 500,
            type: "error",
            message: err
        });
    }
}