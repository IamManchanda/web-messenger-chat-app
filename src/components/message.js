import classNames from "classnames";
import { useAuthState } from "../context/auth";
import dayjs from "dayjs";
import { Button, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import { useState } from "react";
import { REACT_TO_MESSAGE } from "../constants/graphql/mutations";
import { useMutation } from "@apollo/client";

const Message = ({ message }) => {
  const reactions = ["❤️", "😆", "😯", "😢", "😡", "👍", "👎"];
  const [reactToMessage] = useMutation(REACT_TO_MESSAGE, {
    onCompleted(data) {
      setShowPopOver(false);
    },
    onError(error) {
      console.log(error);
    },
  });

  const { user } = useAuthState();
  const sent = message.from === user.username;
  const received = !sent;
  const placement = sent ? "right" : "left";
  const [showPopOver, setShowPopOver] = useState(false);

  const handleReaction = (reaction) => {
    reactToMessage({
      variables: {
        uuid: message.uuid,
        content: reaction,
      },
    });
  };

  const reactButton = (
    <OverlayTrigger
      trigger="click"
      placement="top"
      show={showPopOver}
      onToggle={setShowPopOver}
      transition={false}
      /* rootClose */
      overlay={
        <Popover className="rounded-pill">
          <Popover.Content className="d-flex align-items-center p-1 react-icon-button-popover">
            {reactions.map((reaction) => (
              <Button
                variant="link"
                className="react-icon-button"
                key={reaction}
                onClick={() => handleReaction(reaction)}
              >
                {reaction}
              </Button>
            ))}
          </Popover.Content>
        </Popover>
      }
    >
      <Button variant="link" className="px-2">
        <i className="far fa-smile"></i>
      </Button>
    </OverlayTrigger>
  );

  return (
    <div
      className={classNames("d-flex my-3", {
        "ml-auto": sent,
        "mr-auto": received,
      })}
    >
      {sent && reactButton}
      <OverlayTrigger
        placement={placement}
        overlay={
          <Tooltip>
            {dayjs(message.createdAt).format("MMM DD, YYYY @ h:mm a")}
          </Tooltip>
        }
        transition={false}
      >
        <div
          className={classNames("py-2 px-3 rounded-pill", {
            "bg-primary": sent,
            "bg-secondary": received,
          })}
        >
          <p
            className={classNames({
              "text-white": sent,
            })}
          >
            {message.content}
          </p>
        </div>
      </OverlayTrigger>
      {received && reactButton}
    </div>
  );
};

export default Message;
