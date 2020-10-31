import { useQuery } from "@apollo/client";
import { Col, Image } from "react-bootstrap";
import classNames from "classnames";

import { GET_USERS } from "../constants/graphql/queries";
import { useMessageState, useMessageDispatch } from "../context/message";

const Users = () => {
  const dispatch = useMessageDispatch();

  const { users } = useMessageState();
  const selectedUser = users?.find((u) => u.selected === true)?.username;

  const { loading } = useQuery(GET_USERS, {
    onCompleted(data) {
      dispatch({
        type: "SET_USERS",
        payload: data.getUsers,
      });
    },
    onError(error) {
      console.log(error);
    },
  });

  return (
    <Col xs={4} className="p-0 bg-secondary">
      {!users || loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No users have joined yet.</p>
      ) : users.length > 0 ? (
        users.map((user) => {
          const selected = selectedUser === user.username;

          return (
            <div
              role="button"
              className={classNames(
                "user-container d-flex justify-content-center justify-content-lg-start p-3 border",
                {
                  "user-container-selected": selected,
                },
              )}
              key={user.username}
              onClick={() =>
                dispatch({
                  type: "SET_SELECTED_USER",
                  payload: user.username,
                })
              }
            >
              <Image src={user.imageUrl} className="user-image" />
              <div className="d-none d-lg-block ml-2">
                <p className="text-success">{user.username}</p>
                <p className="font-weight-light">
                  {user.latestMessage
                    ? user.latestMessage.content
                    : "You are now connected"}
                </p>
              </div>
            </div>
          );
        })
      ) : null}
    </Col>
  );
};

export default Users;
