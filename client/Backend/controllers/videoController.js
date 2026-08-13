import pkg from "agora-access-token";

const { RtcTokenBuilder, RtcRole } = pkg;

export const generateToken = (req, res) => {

    try {
        const channelName = req.params.channelName;

        const appID = process.env.AGORA_APP_ID;
        const appCertificate = process.env.AGORA_APP_CERTIFICATE;

        console.log("APP ID:", appID);
        console.log("CERTIFICATE:", appCertificate);

        const uid = Math.floor(Math.random() * 100000);
        const role = RtcRole.PUBLISHER;

        const expirationTimeInSeconds = 3600;

        const currentTimestamp = Math.floor(Date.now() / 1000);

        const privilegeExpiredTs =
            currentTimestamp + expirationTimeInSeconds;


        const token = RtcTokenBuilder.buildTokenWithUid(
            appID,
            appCertificate,
            channelName,
            uid,
            role,
            privilegeExpiredTs
        );


        res.json({
            token,
            appID,
            channelName,
            uid
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Token generation failed"
        });

    }
};