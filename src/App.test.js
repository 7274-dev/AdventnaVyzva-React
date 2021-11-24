// TODO code: add proper tests

import { render, act } from '@testing-library/react';
import { App } from './App';
import { container } from './Container.test';

test('render test', () => {
    act(() => {
        render(<App />, container);
    });

    expect(container).toBeDefined();
    expect(container).toBeVisible();
});
