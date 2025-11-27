# Signup Page

This directory contains the user registration page implementation.

## 📁 Contents

- `page.tsx` - Signup page component with registration form and account creation

## 🆕 Registration Functionality

### Account Creation Process
1. **User Input**: Email and password form fields
2. **Validation**: Real-time client-side validation
3. **API Call**: POST request to `/api/auth/signup/`
4. **Default Categories**: Automatic creation of default categories
5. **Auto-Login**: Immediate authentication after successful signup
6. **Redirect**: Direct to `/dashboard` with full access

### Form Fields
- **Email**: User's email address (required, validated)
- **Password**: Secure password with requirements (required)
- **Password Confirmation**: Password verification (optional)
- **Terms Agreement**: Terms of service acceptance (future feature)

## 🎨 UI Components

### Registration Form
```typescript
<form onSubmit={handleSubmit(onSignup)}>
  <div className="space-y-4">
    <EmailInput
      register={register}
      error={errors.email}
      placeholder="Enter your email"
    />
    <PasswordInput
      register={register}
      error={errors.password}
      showToggle={true}
      requirements={true}
    />
    <SubmitButton
      isLoading={isLoading}
      text="Create Account"
    />
  </div>
</form>
```

### User Experience Elements
- **Welcome Message**: Friendly introduction to the app
- **Password Requirements**: Clear password criteria display
- **Progress Indicators**: Visual feedback during account creation
- **Success Animation**: Confirmation of successful account creation

## 🔧 Technical Implementation

### Form Validation
```typescript
const schema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});
```

### Registration Flow
```typescript
const onSignup = async (data: SignupData) => {
  setIsLoading(true);
  setError('');

  try {
    const response = await authApi.signup(data);

    // Store authentication tokens
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);

    // Set user context
    setUser(response.data.user);

    // Show success message
    toast.success('Welcome! Your account has been created.');

    // Redirect to dashboard
    router.push('/dashboard');
  } catch (error) {
    handleSignupError(error);
  } finally {
    setIsLoading(false);
  }
};
```

## 🎯 Default User Setup

### Automatic Category Creation
Upon successful signup, the backend automatically creates:
1. **"Random Thoughts"** - Color: `#FF6B6B` (coral red)
2. **"School"** - Color: `#4ECDC4` (teal)
3. **"Personal"** - Color: `#45B7D1` (blue)

### Welcome Experience
- **Empty State**: Guidance for new users with no notes
- **Quick Start**: Prominent "Create Note" button
- **Feature Tour**: Optional guided tour of app features (future)
- **Sample Data**: Optional sample notes for demonstration (future)

## 🔒 Security Implementation

### Password Security
```typescript
const PasswordRequirements = () => (
  <div className="text-sm text-gray-600">
    <p>Password must contain:</p>
    <ul className="list-disc list-inside">
      <li>At least 8 characters</li>
      <li>One uppercase letter</li>
      <li>One lowercase letter</li>
      <li>One number</li>
    </ul>
  </div>
);
```

### Input Validation
- **Email Validation**: RFC-compliant email format checking
- **Password Strength**: Enforced complexity requirements
- **Duplicate Prevention**: Check for existing email addresses
- **Rate Limiting**: Prevent spam account creation attempts

### Data Protection
- **HTTPS Only**: Secure transmission of registration data
- **No Plain Text**: Passwords hashed before storage
- **Input Sanitization**: Prevent XSS and injection attacks
- **GDPR Compliance**: Privacy-first data handling

## 📱 Mobile Experience

### Touch Optimization
- **Large Inputs**: Touch-friendly form fields
- **Virtual Keyboard**: Optimized keyboard types (email, password)
- **Submit Button**: Prominent, accessible submit button
- **Error Display**: Mobile-friendly error message positioning

### Progressive Enhancement
- **Works Without JS**: Basic functionality without JavaScript
- **Enhanced With JS**: Rich interactions with JavaScript enabled
- **Offline Handling**: Graceful offline state management
- **Network Awareness**: Adapt to connection quality

## 🔄 User Flow Integration

### Navigation Options
- **From Landing**: Primary entry point for new users
- **From Login**: "Need an account? Sign up" link
- **To Login**: "Already have an account? Sign in" link
- **Back Navigation**: Handle browser back button gracefully

### State Management
```typescript
interface SignupState {
  isLoading: boolean;
  error: string | null;
  step: 'form' | 'verification' | 'success';
  formData: SignupFormData;
}
```

## 🧪 Error Handling

### Registration Errors
- **Email Exists**: "An account with this email already exists"
- **Invalid Email**: "Please enter a valid email address"
- **Weak Password**: "Password doesn't meet requirements"
- **Network Error**: "Please check your connection and try again"
- **Server Error**: "Unable to create account. Please try again."

### Error Recovery
```typescript
const handleSignupError = (error: ApiError) => {
  if (error.response?.status === 400) {
    // Handle validation errors
    const errors = error.response.data;
    Object.keys(errors).forEach(field => {
      setError(field, { message: errors[field][0] });
    });
  } else {
    // Handle general errors
    setError('general', { message: 'Account creation failed' });
  }
};
```

## 🎨 Design Details

### Visual Hierarchy
- **Primary Action**: "Create Account" button prominently displayed
- **Secondary Action**: "Sign in" link less prominent but accessible
- **Form Fields**: Clear labels and helpful placeholder text
- **Error States**: Prominent but not alarming error display

### Accessibility
- **Screen Reader**: ARIA labels and descriptions
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Logical focus order and visual indicators
- **Color Contrast**: WCAG AA compliant color contrast ratios

## 🔧 Development Considerations

### Code Organization
- **Component Separation**: Reusable form components
- **Hook Abstraction**: Custom hooks for signup logic
- **Error Boundaries**: Graceful error handling and recovery
- **Type Safety**: Comprehensive TypeScript coverage

### Performance
- **Form Optimization**: Efficient re-rendering and state updates
- **Bundle Splitting**: Code splitting for non-critical features
- **API Efficiency**: Optimized registration API calls
- **Image Optimization**: Optimized assets and icons

### Testing Strategy
- **Unit Tests**: Form validation and submission logic
- **Integration Tests**: API integration and error scenarios
- **E2E Tests**: Complete signup and onboarding flow
- **Accessibility Tests**: Screen reader and keyboard testing

This signup page provides a welcoming, secure entry point for new users to join the notes application with immediate access to core functionality.