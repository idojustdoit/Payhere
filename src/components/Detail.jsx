import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Pagination from "react-js-pagination";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  height: 250px;
  background-color: skyblue;
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Title = styled.span`
  font-size: 2rem;
  font-weight: 400;
  margin: 1rem;
  color: black;
`;
const StyleA = styled.a`
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 300;
  margin: 1rem;
  color: white;
`;

const Button = styled.button`
  display: inline-block;

  align-content: center;
  text-align: center;
  color: #f2edd7;
  background-color: #755139;
  border: none;
  font-size: 14px;
  font-weight: 400;

  margin: 0px 1px 5px 20px;
  width: 70px;
  height: 36px;
  margin-top: 1.5rem;
  border: 1px solid black;
  transition: all 80ms linear;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  &:hover {
    background-color: rgba(74, 21, 75, 0.9);
    border: none;
  }
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;

const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`;

const Issuespage = () => {
  const navigate = useNavigate();
  const { userInfo, repoInfo } = useParams(); //통신하기위해 필요한 쿼리 값
  const [issues, setIssues] = useState([]); // 통신으로 받을 이슈 배열
  const [page, setPage] = useState(1); // 현재페이지
  const [items, setItems] = useState(8); // 한페이지당 보이는 게시글

  const token = "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";
  const handlePageChange = (page) => {
    setPage(page);
  };

  //  API 통신

  const issuesApi = () => {
    axios
      .get(`https://api.github.com/repos/${userInfo}/${repoInfo}/issues`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setIssues(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    issuesApi();
  }, []);

  return (
    <div>
      <Title>{userInfo}'s Issue List</Title>
      <Button onClick={() => navigate(-1)}>Home</Button>
      <Container>
        {issues
          .slice(items * (page - 1), items * (page - 1) + items)
          .map((issue, id) => {
            return (
              <Card key={id}>
               <Title>{userInfo}</Title>
                <img
                  alt=""
                  src={issue.user.avatar_url}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "10px",
                  }}
                />
                <StyleA href={issue.html_url}>{issue.title}</StyleA>
              </Card>
            );
          })}
      </Container>

      <PaginationBox>
        <Pagination
          activePage={page}
          itemsCountPerPage={items}
          totalItemsCount={issues.length - 1}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        ></Pagination>
      </PaginationBox>
    </div>
  );
};

export default Issuespage;
