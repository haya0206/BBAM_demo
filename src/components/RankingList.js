import React from "react";
import styled from "styled-components";
const Tbody = styled.tbody`
  display: block;
  height: 90%;
  overflow: auto;
`;
const Table = styled.table`
  width: 100%;
  height: 100%;
`;
const Thead = styled.thead`
  display: table;
  width: 100%;
  table-layout: fixed;
`;
const Tr = styled.tr`
  display: table;
  width: 100%;
  table-layout: fixed;
  text-align: center;
`;
const Th = styled.th`
  padding-top: 10px;
  padding-bottom: 10px;
  ${props => {
    if (props.rank) {
      return `width: 20%`;
    }
    if (props.id) {
      return `width: 50%`;
    }
    if (props.rating) {
      return `width: 30%`;
    }
  }};
`;
const Div = styled.div`
  height: 100%;
`;
const Td = styled.td`
  ${props => {
    if (props.rank) {
      return `width: 20%`;
    }
    if (props.id) {
      return `width: 50%`;
    }
    if (props.rating) {
      return `width: 30%`;
    }
  }};
`;
const RankingList = props => {
  const { list } = props;
  let cnt = 1;
  return (
    <Div>
      <Table>
        <Thead>
          <tr>
            <Th rank>순위</Th>
            <Th id>ID</Th>
            <Th rating>승점</Th>
          </tr>
        </Thead>
        <Tbody>
          {console.log(list)}
          {list === null
            ? ""
            : list.map((user, index) => (
                <Tr key={index}>
                  <Td rank>
                    {index === 0
                      ? cnt
                      : list[index - 1].GM_RTN === user.GM_RTN
                      ? cnt
                      : (cnt = index + 1)}
                  </Td>
                  <Td id>{user.GM_ID}</Td>
                  <Td rating>{user.GM_RTN}</Td>
                </Tr>
              ))}
        </Tbody>
      </Table>
    </Div>
  );
};
export default RankingList;
