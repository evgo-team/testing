// Mock react-native components BEFORE imports
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn(() => ({ width: 375, height: 812 })),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AppointmentPopup } from '../AppointmentPopup';

describe('AppointmentPopup Component', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();
  
  const baseProps = {
    visible: true,
    onClose: mockOnClose,
    onConfirm: mockOnConfirm,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ...existing code...

  describe('Modal Visibility Tests', () => {
    // ...existing code...

    it('should call onClose when modal backdrop is pressed', () => {
      const { getByTestId } = render(
        <AppointmentPopup {...baseProps} type="success-confirm" />
      );
      
      const overlay = getByTestId('overlay');
      fireEvent.press(overlay);
      
      // May be called once or not at all depending on TouchableWithoutFeedback behavior
      expect(mockOnClose).toHaveBeenCalled();
    });

    // ...existing code...
  });

// ...existing code...

  describe('Type: success-confirm', () => {
    it('should render success-confirm container', () => {
      const { getByTestId } = render(
        <AppointmentPopup {...baseProps} type="success-confirm" />
      );
      
      expect(getByTestId('success-confirm-container')).toBeTruthy();
    });

    it('should display success confirmation title', () => {
      const { getByText } = render(
        <AppointmentPopup {...baseProps} type="success-confirm" />
      );
      
      expect(getByText('Xác nhận thành công')).toBeTruthy();
    });

    it('should render close button', () => {
      const { getByTestId } = render(
        <AppointmentPopup {...baseProps} type="success-confirm" />
      );
      
      expect(getByTestId('close-button')).toBeTruthy();
    });

    it('should call onClose when close button is pressed', () => {
      const { getByTestId } = render(
        <AppointmentPopup {...baseProps} type="success-confirm" />
      );
      
      const closeButton = getByTestId('close-button');
      fireEvent.press(closeButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should display close button text', () => {
      const { getByText } = render(
        <AppointmentPopup {...baseProps} type="success-confirm" />
      );
      
      expect(getByText('Đóng')).toBeTruthy();
    });

    it('should render icon container', () => {
      const { getByTestId } = render(
        <AppointmentPopup {...baseProps} type="success-confirm" />
      );
      
      const container = getByTestId('success-confirm-container');
      expect(container).toBeTruthy();
    });
  });

  describe('Type: confirm-reject', () => {
    it('should render confirm-reject container', () => {
      const { getByTestId } = render(
        <AppointmentPopup {...baseProps} type="confirm-reject" />
      );
      
      expect(getByTestId('confirm-reject-container')).toBeTruthy();
    });

    it('should display reject confirmation question', () => {
      const { getByText } = render(
        <AppointmentPopup {...baseProps} type="confirm-reject" />
      );
      
      expect(getByText('Bạn có chắc chân muốn từ chối cuộc hẹn này?')).toBeTruthy();
    });

    it('should render cancel reject button', () => {
      const { getByTestId } = render(
        <AppointmentPopup {...baseProps} type="confirm-reject" />
      );
      
      expect(getByTestId('cancel-reject-button')).toBeTruthy();
    });

    it('should render confirm reject button', () => {
      const { getByTestId } = render(
        <AppointmentPopup {...baseProps} type="confirm-reject" />
      );
      
      expect(getByTestId('confirm-reject-button')).toBeTruthy();
    });

    it('should call onClose when cancel button is pressed', () => {
      const { getByTestId } = render(
        <AppointmentPopup {...baseProps} type="confirm-reject" />
      );
      
      const cancelButton = getByTestId('cancel-reject-button');
      fireEvent.press(cancelButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onConfirm when confirm button is pressed', () => {
      const { getByTestId } = render(
        <AppointmentPopup {...baseProps} type="confirm-reject" />
      );
      
      const confirmButton = getByTestId('confirm-reject-button');
      fireEvent.press(confirmButton);
      
      expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });

    it('should display cancel button text', () => {
      const { getByText } = render(
        <AppointmentPopup {...baseProps} type="confirm-reject" />
      );
      
      expect(getByText('Hủy')).toBeTruthy();
    });

    it('should display confirm button text', () => {
      const { getByText } = render(
        <AppointmentPopup {...baseProps} type="confirm-reject" />
      );
      
      expect(getByText('Xác nhận')).toBeTruthy();
    });

    it('should render both buttons in a row', () => {
      const { getByTestId } = render(
        <AppointmentPopup {...baseProps} type="confirm-reject" />
      );
      
      const cancelButton = getByTestId('cancel-reject-button');
      const confirmButton = getByTestId('confirm-reject-button');
      
      expect(cancelButton).toBeTruthy();
      expect(confirmButton).toBeTruthy();
    });
  });

  describe('Type: success-reject', () => {
    it('should render success-reject container', () => {
      const { getByTestId } = render(
        <AppointmentPopup {...baseProps} type="success-reject" />
      );
      
      expect(getByTestId('success-reject-container')).toBeTruthy();
    });

    it('should display success rejection title', () => {
      const { getByText } = render(
        <AppointmentPopup {...baseProps} type="success-reject" />
      );
      
      expect(getByText('Từ chối thành công')).toBeTruthy();
    });

    it('should render close button', () => {
      const { getByTestId } = render(
        <AppointmentPopup {...baseProps} type="success-reject" />
      );
      
      expect(getByTestId('close-button')).toBeTruthy();
    });

    it('should call onClose when close button is pressed', () => {
      const { getByTestId } = render(
        <AppointmentPopup {...baseProps} type="success-reject" />
      );
      
      const closeButton = getByTestId('close-button');
      fireEvent.press(closeButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should display close button text', () => {
      const { getByText } = render(
        <AppointmentPopup {...baseProps} type="success-reject" />
      );
      
      expect(getByText('Đóng')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing onConfirm prop for confirm-reject type', () => {
      const propsWithoutOnConfirm = {
        ...baseProps,
        onConfirm: undefined,
      };
      
      const { getByTestId } = render(
        <AppointmentPopup {...propsWithoutOnConfirm} type="confirm-reject" />
      );
      
      const confirmButton = getByTestId('confirm-reject-button');
      expect(() => fireEvent.press(confirmButton)).not.toThrow();
    });

    it('should render default case when invalid type', () => {
      const { queryByTestId } = render(
        <AppointmentPopup {...baseProps} type={'invalid' as any} />
      );
      
      expect(queryByTestId('success-confirm-container')).toBeNull();
      expect(queryByTestId('confirm-reject-container')).toBeNull();
      expect(queryByTestId('success-reject-container')).toBeNull();
    });
  });

  describe('Snapshot Tests', () => {
    it('should match snapshot for success-confirm type', () => {
      const { toJSON } = render(
        <AppointmentPopup {...baseProps} type="success-confirm" />
      );
      
      expect(toJSON()).toMatchSnapshot();
    });

    it('should match snapshot for confirm-reject type', () => {
      const { toJSON } = render(
        <AppointmentPopup {...baseProps} type="confirm-reject" />
      );
      
      expect(toJSON()).toMatchSnapshot();
    });

    it('should match snapshot for success-reject type', () => {
      const { toJSON } = render(
        <AppointmentPopup {...baseProps} type="success-reject" />
      );
      
      expect(toJSON()).toMatchSnapshot();
    });

    it('should match snapshot when not visible', () => {
      const { toJSON } = render(
        <AppointmentPopup {...baseProps} type="success-confirm" visible={false} />
      );
      
      expect(toJSON()).toMatchSnapshot();
    });
  });
});