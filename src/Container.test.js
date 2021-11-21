import { unmountComponentAtNode } from 'react-dom';

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
});
afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test('container', () => {
    expect(container).toBeDefined();
});

export { container };
