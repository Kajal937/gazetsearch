import { Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';
import './style.scss'

const Whatsapp = () => {
    const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

    const openWhatsApp = () => {
      setIsWhatsAppOpen(true);
    };
  
    const closeWhatsApp = () => {
      setIsWhatsAppOpen(false);
    };
  

    return (
        <Box className='whatsapp-container sm:rounded-[50px] rounded-[46%] justify-end w-[202px] !h-[40px] max-sm:!w-[40px] sm:px-6 sm:py-4 max-sm:!justify-center'
        >
            <WhatsAppWidget
                phoneNumber={"+64211172680"}
                inputPlaceHolder="Type a message"
                sendButtonText="Send"
                message="Hello! 👋🏼 What can we do for you"
                companyName="Support"
                replyTimeText="Typically Replies Instantly"
                // CompanyIcon={CompanyIcon}
            //     CompanyIcon={`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" className="cursor-pointer" viewBox="0 0 48 48">
            //     <path fill="#3F51B5" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"></path>
            //   </svg>`} // Your company SVG icon
                open={false}
            />
            <Text className="text-[white] !text-[18px] whatsp-text sm:block hidden" onClick={openWhatsApp}>May I help you?</Text>
        </Box>
    );
};
export default Whatsapp;