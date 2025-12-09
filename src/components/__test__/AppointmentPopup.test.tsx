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
  
  const defaultProps = {
    visible: true,
    onClose: mockOnClose,
    onConfirm: mockOnConfirm,
    doctorName: 'Dr. John Smith',
    specialty: 'Cardiologist',
    appointmentDate: '2025-12-15',
    appointmentTime: '10:00 AM',
    type: 'success-confirm' as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    it('should render without crashing', () => {
      const { getByTestId } = render(<AppointmentPopup {...defaultProps} />);
      
      expect(getByTestId('appointment-modal')).toBeTruthy();
    });

    it('should render the modal when visible is true', () => {
      const { getByTestId } = render(<AppointmentPopup {...defaultProps} />);
      
      const modal = getByTestId('appointment-modal');
      expect(modal.props.visible).toBe(true);
    });

    it('should not be visible when visible prop is false', () => {
      const { getByTestId } = render(
        <AppointmentPopup {...defaultProps} visible={false} />
      );
      
      const modal = getByTestId('appointment-modal');
      expect(modal.props.visible).toBe(false);
    });

    it('should display correct doctor name', () => {
      const { getByText } = render(<AppointmentPopup {...defaultProps} />);
      
      expect(getByText('Dr. John Smith')).toBeTruthy();
    });

    it('should display correct specialty', () => {
      const { getByText } = render(<AppointmentPopup {...defaultProps} />);
      
      expect(getByText('Cardiologist')).toBeTruthy();
    });

    it('should display correct appointment date', () => {
      const { getByText } = render(<AppointmentPopup {...defaultProps} />);
      
      expect(getByText(/2025-12-15/)).toBeTruthy();
    });

    it('should display correct appointment time', () => {
      const { getByText } = render(<AppointmentPopup {...defaultProps} />);
      
      expect(getByText(/10:00 AM/)).toBeTruthy();
    });

    it('should render confirm button', () => {
      const { getByTestId } = render(<AppointmentPopup {...defaultProps} />);
      
      expect(getByTestId('confirm-button')).toBeTruthy();
    });

    it('should render cancel button', () => {
      const { getByTestId } = render(<AppointmentPopup {...defaultProps} />);
      
      expect(getByTestId('cancel-button')).toBeTruthy();
    });
  });

  describe('Interaction Tests', () => {
    it('should call onConfirm when confirm button is pressed', () => {
      const { getByTestId } = render(<AppointmentPopup {...defaultProps} />);
      
      const confirmButton = getByTestId('confirm-button');
      fireEvent.press(confirmButton);
      
      expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when cancel button is pressed', () => {
      const { getByTestId } = render(<AppointmentPopup {...defaultProps} />);
      
      const cancelButton = getByTestId('cancel-button');
      fireEvent.press(cancelButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when backdrop is pressed', () => {
      const { getByTestId } = render(<AppointmentPopup {...defaultProps} />);
      
      const modal = getByTestId('appointment-modal');
      fireEvent(modal, 'onRequestClose');
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Type Prop Tests', () => {
    it('should render with success-confirm type', () => {
      const { getByTestId } = render(
        <AppointmentPopup {...defaultProps} type="success-confirm" />
      );
      
      expect(getByTestId('appointment-modal')).toBeTruthy();
    });

    it('should render with confirm-reject type', () => {
      const { getByTestId } = render(
        <AppointmentPopup {...defaultProps} type="confirm-reject" />
      );
      
      expect(getByTestId('appointment-modal')).toBeTruthy();
    });

    // it('should render with error type', () => {
    //   const { getByTestId } = render(
    //     <AppointmentPopup {...defaultProps} type="error" />
    //   );
      
    //   expect(getByTestId('appointment-modal')).toBeTruthy();
    // });
  });

  describe('Props Validation', () => {
    it('should handle empty doctor name', () => {
      const props = { ...defaultProps, doctorName: '' };
      const { getByTestId } = render(<AppointmentPopup {...props} />);
      
      expect(getByTestId('appointment-modal')).toBeTruthy();
    });

    it('should handle empty specialty', () => {
      const props = { ...defaultProps, specialty: '' };
      const { getByTestId } = render(<AppointmentPopup {...props} />);
      
      expect(getByTestId('appointment-modal')).toBeTruthy();
    });

    it('should handle empty appointment date', () => {
      const props = { ...defaultProps, appointmentDate: '' };
      const { getByTestId } = render(<AppointmentPopup {...props} />);
      
      expect(getByTestId('appointment-modal')).toBeTruthy();
    });

    it('should handle empty appointment time', () => {
      const props = { ...defaultProps, appointmentTime: '' };
      const { getByTestId } = render(<AppointmentPopup {...props} />);
      
      expect(getByTestId('appointment-modal')).toBeTruthy();
    });

    it('should handle undefined onConfirm', () => {
      const props = { ...defaultProps, onConfirm: undefined };
      const { getByTestId } = render(<AppointmentPopup {...props} />);
      
      const confirmButton = getByTestId('confirm-button');
      expect(() => fireEvent.press(confirmButton)).not.toThrow();
    });

    it('should handle empty onClose function', () => {
      const props = { ...defaultProps, onClose: () => {} };
      const { getByTestId } = render(<AppointmentPopup {...props} />);
      
      const cancelButton = getByTestId('cancel-button');
      expect(() => fireEvent.press(cancelButton)).not.toThrow();
    });
  });

  describe('Modal Properties Tests', () => {
    it('should apply correct modal properties', () => {
      const { getByTestId } = render(<AppointmentPopup {...defaultProps} />);
      
      const modal = getByTestId('appointment-modal');
      expect(modal.props.transparent).toBe(true);
      expect(modal.props.animationType).toBe('fade');
    });

    it('should have modal visible when prop is true', () => {
      const { getByTestId } = render(<AppointmentPopup {...defaultProps} visible={true} />);
      
      const modal = getByTestId('appointment-modal');
      expect(modal.props.visible).toBe(true);
    });

    it('should have modal not visible when prop is false', () => {
      const { getByTestId } = render(<AppointmentPopup {...defaultProps} visible={false} />);
      
      const modal = getByTestId('appointment-modal');
      expect(modal.props.visible).toBe(false);
    });
  });

  describe('Snapshot Tests', () => {
    it('should match snapshot when visible with success-confirm type', () => {
      const { toJSON } = render(<AppointmentPopup {...defaultProps} />);
      
      expect(toJSON()).toMatchSnapshot();
    });

    it('should match snapshot when not visible', () => {
      const { toJSON } = render(
        <AppointmentPopup {...defaultProps} visible={false} />
      );
      
      expect(toJSON()).toMatchSnapshot();
    });

    it('should match snapshot with confirm-reject type', () => {
      const { toJSON } = render(
        <AppointmentPopup {...defaultProps} type="confirm-reject" />
      );
      
      expect(toJSON()).toMatchSnapshot();
    });

    // it('should match snapshot with error type', () => {
    //   const { toJSON } = render(
    //     <AppointmentPopup {...defaultProps} type="error" />
    //   );
      
    //   expect(toJSON()).toMatchSnapshot();
    // });

    it('should match snapshot with minimal props', () => {
      const minimalProps = {
        visible: true,
        onClose: mockOnClose,
        onConfirm: mockOnConfirm,
        doctorName: '',
        specialty: '',
        appointmentDate: '',
        appointmentTime: '',
        type: 'success-confirm' as const,
      };
      
      const { toJSON } = render(<AppointmentPopup {...minimalProps} />);
      
      expect(toJSON()).toMatchSnapshot();
    });
  });
});