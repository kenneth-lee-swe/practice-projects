import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    render(<App />)
  });

  test('renders input field', () => {
    const binaryInput = screen.getByLabelText('Input Binary:');
    expect(binaryInput).toBeInTheDocument();
    expect(binaryInput.value).toEqual('');
  });

  test('renders display field', () => {
    const display = screen.getByText('Input a binary value to see the decimal conversion');
    expect(display).toBeInTheDocument();
  });

  describe('when user inputs characters', () => {
    test('inputs the characters', () => {
      const binaryInput = screen.getByLabelText('Input Binary:');

      fireEvent.change(binaryInput, { target: { value: '1' } });
      expect(binaryInput.value).toEqual('1');
    })

    test('shows an error message when characters include non-one or non-zero characters', () => {
      const binaryInput = screen.getByLabelText('Input Binary:');
      const display = screen.getByText('Input a binary value to see the decimal conversion');

      fireEvent.change(binaryInput, { target: { value: '2' } });
      expect(display.textContent).toEqual('Please only input binary values (1 or 0)');
    });

    test.each([
      [1010, 10],
      [1101, 13],
      [10011, 19],
    ])('converts binary values to decimal values', (bin, dec) => {
      const binaryInput = screen.getByLabelText('Input Binary:');
      const display = screen.getByText('Input a binary value to see the decimal conversion');

      fireEvent.change(binaryInput, { target: { value: bin } });
      expect(display.textContent).toEqual(dec.toString());
    });
  });
});
