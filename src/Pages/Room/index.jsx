import React, { useRef, useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import {AppContext} from "../../store/auth"

const Index = () => {
  const {state} = useContext(AppContext)
  const { RoomId } = useParams();
  const meetingContainerRef = useRef(null);

  useEffect(() => {
    const appID = 2074689229;
    const serverSecret = "1ada9bf5048f6379b76e04d03589bab0";
    
    // Ensure userID is a string, using a unique value like user name or a timestamp
    const userID = state.user.id;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      RoomId,
      userID, // Use a unique string as userID
      "Omnath"
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: meetingContainerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  }, [RoomId]);

  return <div ref={meetingContainerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Index;
