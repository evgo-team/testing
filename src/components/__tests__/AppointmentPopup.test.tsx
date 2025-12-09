// Mock react-native components BEFORE imports
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn(() => ({ width: 375, height: 812 })),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import {AppointmentPopup} from '../AppointmentPopup';

describe('AppointmentPopup Component', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();
  
  const defaultProps = {
    visible: true,
    onClose: mockOnClose,
    onConfirm: mockOnConfirm,
    doctorName: 'Dr. John Smith',
    specialty: 'Cardiologist',
    appointmentDate: '2025-12-15',
    appointmentTime: '10:00 AM',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    it('should render without crashing', () => {
      const { getByTestId } = render(<AppointmentPopup type={'success-confirm'} {...defaultProps} />);
      expect(getByTestId('appointment-modal')).toBeTruthy();
    });

    it('should render the modal when visible is true', () => {
      const { getByTestId } = render(<AppointmentPopup type={'success-confirm'} {...defaultProps} />);
      const modal = getByTestId('appointment-modal');
      expect(modal.props.visible).toBe(true);
    });

    it('should not be visible when visible prop is false', () => {
      const { getByTestId } = render(
        <AppointmentPopup type={'success-confirm'} {...defaultProps} visible={false} />
      );
      const modal = getByTestId('appointment-modal');
      expect(modal.props.visible).toBe(false);
    });

    it('should display correct doctor name', () => {
      const { getByText } = render(<AppointmentPopup type={'success-confirm'} {...defaultProps} />);
      expect(getByText('Dr. John Smith')).toBeTruthy();
    });

    it('should display correct specialty', () => {
      const { getByText } = render(<AppointmentPopup type={'success-confirm'} {...defaultProps} />);
      expect(getByText('Cardiologist')).toBeTruthy();
    });

    it('should render confirm button', () => {
      const { getByTestId } = render(<AppointmentPopup type={'success-confirm'} {...defaultProps} />);
      expect(getByTestId('confirm-button')).toBeTruthy();
    });

    it('should render cancel button', () => {
      const { getByTestId } = render(<AppointmentPopup type={'success-confirm'} {...defaultProps} />);
      expect(getByTestId('cancel-button')).toBeTruthy();
    });
  });

  describe('Interaction Tests', () => {
    it('should call onConfirm when confirm button is pressed', () => {
      const { getByTestId } = render(<AppointmentPopup type={'success-confirm'} {...defaultProps} />);
      const confirmButton = getByTestId('confirm-button');
      fireEvent.press(confirmButton);
      expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when cancel button is pressed', () => {
      const { getByTestId } = render(<AppointmentPopup type={'success-confirm'} {...defaultProps} />);
      const cancelButton = getByTestId('cancel-button');
      fireEvent.press(cancelButton);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when backdrop is pressed', () => {
      const { getByTestId } = render(<AppointmentPopup type={'success-confirm'} {...defaultProps} />);
      const modal = getByTestId('appointment-modal');
      fireEvent(modal, 'onRequestClose');
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Snapshot Tests', () => {
    it('should match snapshot when visible', () => {
      const { toJSON } = render(<AppointmentPopup type={'success-confirm'} {...defaultProps} />);
      expect(toJSON()).toMatchSnapshot();
    });

    it('should match snapshot when not visible', () => {
      const { toJSON } = render(
        <AppointmentPopup type={'success-confirm'} {...defaultProps} visible={false} />
      );
      expect(toJSON()).toMatchSnapshot();
    });
  });
});