import axios from 'axios';

const sendSingleSMS = async (to: string, content: string) => {
    try {
        const response = await axios.get('https://smsc.hubtel.com/v1/messages/send', {
            params: {
                clientid: 'htpdvnvv',
                clientsecret: 'xwxzkatx',
                from: 'Jume',
                to,
                content,
            },
        });
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw error;
    }
};

export const sendSMS = async (userName: string, phoneNumber: string) => {
    const message = `${userName}, Thank you for registering with Jume. Shop from anywhere, at anytime!. You can reach out to us at +233541190955 for any enqueries. Happy Shopping!`;
    const recipient = phoneNumber;

    try {
        await sendSingleSMS(recipient, message);
        console.log('All SMS sent successfully');
    } catch (error) {
        console.error('Error sending one or more SMS:', error);
    }
};