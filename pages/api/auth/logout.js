import { deleteCookie } from 'cookies-next';

export default async function handeler(req, res) {
    try {
        deleteCookie('jwtAuthToken', { req, res });

        return res.status(200).json({
            status: 200,
            type: "success",
            message: "Successfully Loggedout",
        })
    } catch (err) {
        console.error(">>===> Error: ", err);
        res.status(500).json({
            status: 500,
            type: "error",
            message: err
        });
    }
}