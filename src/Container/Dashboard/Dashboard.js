import React, { useContext, useState } from "react";
import styled from "styled-components";
import { PageHeader, Input, Button } from "antd";
import Typography from "@material-ui/core/Typography";
import TopicList from "./TopicList/TopicList";
import Dialog from "./Dialog/Dialog";
import { ctx } from "./Store";
import { TextField } from "@material-ui/core";

const { TextArea } = Input;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fcfceb;
`;
const Header = styled.div`
  height: 100px;
  margin: 50px;
`;
const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;
const SideLeft = styled.div`
  border-right: 1px solid grey;
  width: 25%;
`;
const SideRight = styled.div`
  padding: 5px;
  flex: 1;
  width: 75%;
  display: flex;
  flex-direction: column;
`;
const DialogBox = styled.div`
  flex: 1;
`;

const MessageInputBox = styled.div`
  height: 60px;
  display: "flex";
  alignitems: "center";
`;

function Dashboard() {
  const { allCharts, sendMessageAction, user } = useContext(ctx);
  const topics = Object.keys(allCharts);
  const [activeTopic, changeActiveTopic] = useState(topics[0]);
  const [textValue, setTextValue] = useState("");
  console.log(allCharts);
  return (
    <Box>
      <Header>
        <Typography variant="h4" component="h4">
          Chat App
        </Typography>
        <Typography variant="h5" component="h5">
          {activeTopic}
        </Typography>
      </Header>
      <Content>
        <SideLeft>
          <TopicList {...{ topics, changeActiveTopic, activeTopic }} />
        </SideLeft>
        <SideRight>
          <DialogBox>
            <Dialog list={allCharts[activeTopic]} />
          </DialogBox>
          <MessageInputBox>
            <TextField
              label="Send a chat"
              rows={1}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
            />
            <Button
              color="primary"
              onClick={() => {
                sendMessageAction({
                  from: user,
                  msg: textValue,
                  topic: activeTopic,
                });
                setTextValue("");
              }}
            >
              Send
            </Button>
          </MessageInputBox>
        </SideRight>
      </Content>
    </Box>
  );
}

export default Dashboard;
