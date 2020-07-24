package com.vo;

import java.util.Date;

public class SocketVO {
    // 유저의 이름을 저장하기 위한 변수
    private String userName;

    // 메시지의 내용을 저장하기 위한 변
    private String content;
	private int chno;
	private int pid;
	private String nickname;
	private String id;
	public int getChno() {
		return chno;
	}

	public void setChno(int chno) {
		this.chno = chno;
	}

	public int getPid() {
		return pid;
	}

	@Override
	public String toString() {
		return "SocketVO [userName=" + userName + ", content=" + content + ", chno=" + chno + ", pid=" + pid
				+ ", nickname=" + nickname + ", id=" + id + ", makedate=" + makedate + "]";
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Date getMakedate() {
		return makedate;
	}

	public void setMakedate(Date makedate) {
		this.makedate = makedate;
	}

	/**
	 * @param userName
	 * @param content
	 * @param chno
	 * @param pid
	 * @param nickname
	 * @param id
	 * @param makedate
	 */
	public SocketVO(String userName, String content, int chno, int pid, String nickname, String id, Date makedate) {
		super();
		this.userName = userName;
		this.content = content;
		this.chno = chno;
		this.pid = pid;
		this.nickname = nickname;
		this.id = id;
		this.makedate = makedate;
	}

	private Date makedate;

	/**
	 * @param userName
	 * @param content
	 */
	public SocketVO(String userName, String content) {
		super();
		this.userName = userName;
		this.content = content;
	}

	/**
	 * 
	 */
	public SocketVO() {
		super();
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
    
}
