import { PageSlider, PageSliderPage } from "../pageslider/PageSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

// importing pages
import ProjectsPage from "../../pages/Projects";

const PageCard = styled.section`
  width: 100%;
  max-height: 90%;
  overflow-y: auto;
  border: solid 2px white;
  padding: 1rem;
  margin: 0 2rem;
  backdrop-filter: blur(10px);
  border-radius: 8px;
`;

export default function ProfilePageSlider(props) {
  return (
    <PageSlider style={{ color: "white" }}>
      <PageSliderPage
        indicatorRepresentor={<FontAwesomeIcon icon={faEnvelope} />}
      >
        <PageCard>
          <ProjectsPage/>
        </PageCard>
      </PageSliderPage>
      <PageSliderPage indicatorRepresentor={<FontAwesomeIcon icon={faUser} />}>
        <h1>Second Page</h1>
      </PageSliderPage>
      <PageSliderPage indicatorRepresentor={<FontAwesomeIcon icon={faUsers} />}>
        <h1>Third Page</h1>
      </PageSliderPage>
    </PageSlider>
  );
}
