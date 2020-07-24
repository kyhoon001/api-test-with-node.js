package com.controller;

import com.vo.SocketVO;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
public class SocketController {


    // /receive를 메시지를 받을 endpoint로 설정합니다.
	/*
    @MessageMapping("/receive")

    // /send로 메시지를 반환합니다.
    @SendTo("/send")

    // SocketHandler는 1) /receive에서 메시지를 받고, /send로 메시지를 보내줍니다.
    // 정의한 SocketVO를 1) 인자값, 2) 반환값으로 사용합니다.
    public SocketVO SocketHandler(SocketVO socketVO) {
        // vo에서 getter로 userName을 가져옵니다.
        String userName = socketVO.getUserName();
        // vo에서 setter로 content를 가져옵니다.
        String content = socketVO.getContent();

        // 생성자로 반환값을 생성합니다.
        SocketVO result = new SocketVO(userName, content);
        // 반환
        return result;
    }
    */
	/*
	//여기부터 추가부분
	    private final SimpMessageSendingOperations messagingTemplate = null;

	    @MessageMapping("/chat/message/{pid}")
	    public void message(@DestinationVariable("pid") SocketVO message) {
	        message.setContent(message.getUserName() + "님이 입장하셨습니다.");
	        //messagingTemplate.convertAndSend("/sub/chat/room/1", message); // 일단 1번방 통일 
	        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getPid(), message);
	        System.out.println("내용이 들어옵니당 ㅎㅎㅎ" + message.getContent());
	    }
	// 여기까지
    // /receive를 메시지를 받을 endpoint로 설정합니다.
    @MessageMapping("/receive")

    // /send로 메시지를 반환합니다.
    //@SendTo("/send/{pid}")
    @SendTo("/send")

    // SocketHandler는 1) /receive에서 메시지를 받고, /send로 메시지를 보내줍니다.
    // 정의한 SocketVO를 1) 인자값, 2) 반환값으로 사용합니다.
    public SocketVO SocketHandler(SocketVO socketVO) {
        // vo에서 getter로 userName을 가져옵니다.
        String userName = socketVO.getUserName();
        // vo에서 setter로 content를 가져옵니다.
        String content = socketVO.getContent();

        // 생성자로 반환값을 생성합니다.
        SocketVO result = new SocketVO(userName, content);
        // 반환
        return result;
    }
	*/

    //private final SimpMessageSendingOperations messagingTemplate = null;


    @MessageMapping("/receive/{pid}")
    @SendTo("/send/{pid}")
    public SocketVO getMessage(@DestinationVariable int pid, SocketVO message) {
        System.out.println("실행");
        System.out.println(message);
        System.out.println(message.getUserName() + "님이 입장하셨습니다.");
        System.out.println("pid값 : " + pid);
        //messagingTemplate.convertAndSend("/send/" + pid, message);
        System.out.println("내용이 들어옵니당 ㅎㅎㅎ" + message.getContent());
        System.out.println("끝");
        return message;
    }
}
