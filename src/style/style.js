import { Card, Container, Row } from "react-bootstrap";
import styled from "styled-components";

export const MContainer = styled(Container)`
  height: 100vh;
`;

export const MRow = styled(Row)`
  height: 100vh;
`;

export const ContentPost = styled.div`
  border-right: 1px solid rgb(239, 243, 244);
  border-left: 1px solid rgb(239, 243, 244);
`;

export const MCard = styled(Card)`
  border: none;
  border-bottom: 1px solid rgba(0,0,0,.125);
  margin-bottom: 3rem;
  border-radius: 0;

  .card-link {
    text-decoration: none;
    float: right;
  }

`;

export const MPost = styled.div`
  margin: 2rem 0;
  border-bottom: 1px solid rgb(239,243,244);
  padding-bottom: 16px;

  p {
    font-size: 14px;
  }
`;

export const MNewComment = styled.div`
  margin: 2rem 0;
`;

export const MCommentContent = styled.div`
  border-bottom: 1px solid rgb(233 234 234);
  padding: 1rem;
`;
