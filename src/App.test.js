// TODO code: add proper tests
// TODO code: split tests into different files
// FIXME

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
