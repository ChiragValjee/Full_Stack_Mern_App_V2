// Using the @testing-library/react library and the react-test-renderer package to test a React application.
// It first imports the necessary testing components and the App component to be tested.
// The code then defines three tests: one to check if the landing page renders without errors,
// another to check if the main heading is present,
// and a third to create a snapshot of the App component for future reference.
// The tests use the render and screen functions to simulate rendering the App component,
// and the expect function to check if certain elements are present on the page or if the snapshot matches the expected output.

import {render, screen} from '@testing-library/react';
import App from '../App';
import renderer from 'react-test-renderer';
import Index from '../pages/index'

test('renders the landing page', () => {
    render(<Index/>);
});

test('renders the main heading', () => {
    render(<Index/>);
    expect(screen.getByRole("heading", {name: /Login/, class: "title"})).toBeInTheDocument();
})

test("snapshot for App component", () => {
    const tree = renderer.create(<App/>).toJSON()
    expect(tree).toMatchSnapshot()
})