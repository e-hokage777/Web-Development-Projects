import { useState } from "react";
import "./pageslider.css";

// PAGE SLIDER COMPONENT
export function PageSlider(props) {

  // for instances where there is only one child
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];

  let currentPageIndex = 0;
  const [page, setPage] = useState(currentPageIndex);

  // converting indicators to list and adding function to update page
  const indicators = children.map((child, index) => (
    <li onClick={()=>setPage(index)} key={index}>
      {child.props.indicatorRepresentor}
    </li>
  ));


  return (
    <div style={props.style} className="page-slider">
      <PageSliderInner
        style={{ transform: `translateX(-${page * 100}%)` }}
        indicators={indicators}
      >
        {props.children}
      </PageSliderInner>
      <ul className="page-slider-indicators">{indicators}</ul>
    </div>
  );
}

// HOLDS PAGES
function PageSliderInner(props) {
  return (
    <div style={props.style} className="page-slider-inner">
      {props.children}
    </div>
  );
}

// INDIVIDUAL PAGE COMPONENTS
export function PageSliderPage(props) {
  return (
    <div style={props.style} className="page-slider-page">
      {props.children}
    </div>
  );
}
