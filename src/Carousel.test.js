import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("renders", () => {
  render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
})

it("matches snapshot", () => {
  const {asFragment} = render(<Carousel 
                                photos={TEST_IMAGES}
                                title="images for testing"
                              />);
  expect(asFragment).toMatchSnapshot();
})

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 2"]'))
    .toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]'))
    .not.toBeInTheDocument();

  // move backward in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 2"]'))
    .not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]'))
    .toBeInTheDocument();  
});

it("does not show left arrow on first or right arrow on last", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 2"]'))
    .not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]'))
    .toBeInTheDocument();
  //expect the left arrow to be hidden
  expect(
    container.querySelector('.bi-arrow-left-circle'))
    .not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // expect the third image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 3"]'))
    .toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]'))
    .not.toBeInTheDocument();

  // expect the right arrow to be hidden
  expect(
    container.querySelector('.bi-arrow-right-circle'))
    .not.toBeInTheDocument();
});
