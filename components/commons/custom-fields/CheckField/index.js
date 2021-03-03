import PropTypes from 'prop-types';
import { FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import { ErrorMessage } from 'formik';

CheckField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

CheckField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
}

function CheckField(props) {
  const {
    field, form,
    type, label, placeholder, disabled,
  } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <FormGroup>

      <Input
        id={name}
        {...field}

        type={type}
        disabled={disabled}
        placeholder={placeholder}

        invalid={showError}
      />
      {label && <Label for={name}>{label}</Label>}

      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
}

export default CheckField;