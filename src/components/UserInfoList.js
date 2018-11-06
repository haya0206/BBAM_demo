import React from "react";
import styled from "styled-components";
const List = styled.div`
  height: 100%;
  border-radius: 10px;
  overflow: auto;
`;
const Tr = styled.tr``;
const Th = styled.th`
  border-top: 1px solid #ddd;
  border-right: 1px solid #ddd;
  padding: 8px;
  width: 100px;
  vertical-align: top;
`;
const Td = styled.td`
  border-top: 1px solid #ddd;
  padding: 8px;
  width: 150px;
  vertical-align: top;
  text-align: center;
`;
const ListName = styled;
const UserInfoList = props => {
  const { list } = props;
  const listName = ["랭킹", "제출", "정답", "오답"];
  return (
    <List>
      <table>
        <tbody>
          {list === null
            ? ""
            : Object.keys(list).map((key, index) => (
                <Tr key={key}>
                  <Th>{listName[index]}</Th>
                  <Td>{list[key]}</Td>
                </Tr>
              ))}
        </tbody>
      </table>
    </List>
  );
};
export default UserInfoList;
