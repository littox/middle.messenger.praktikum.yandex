import { ValidationRuleNames } from '../../../utils/Validator';
import { onBlur } from '../../../utils/validateInput';

export const inputs = [
  {
    type: 'email',
    placeholder: 'email@example.com',
    name: 'email',
    value: 'email@example.com',
    disabled: true,
    validation: ValidationRuleNames.email,
    errors: [],
    events: {
      focusout: onBlur,
    },
  },
  {
    type: 'text',
    placeholder: 'Логин',
    name: 'login',
    value: 'email@example.com',
    validation: ValidationRuleNames.login,
    disabled: true,
    errors: [],
    events: {
      focusout: onBlur,
    },
  },
  {
    type: 'text',
    placeholder: 'Имя',
    name: 'first_name',
    value: 'Антон',
    validation: ValidationRuleNames.name,
    disabled: true,
    errors: [],
    events: {
      focusout: onBlur,
    },
  },
  {
    type: 'text',
    placeholder: 'Фамилия',
    name: 'second_name',
    value: 'Иванов',
    validation: ValidationRuleNames.name,
    disabled: true,
    errors: [],
    events: {
      focusout: onBlur,
    },
  },
  {
    type: 'text',
    placeholder: 'Имя в чате',
    name: 'display_name',
    value: 'sharif',
    validation: ValidationRuleNames.name,
    disabled: true,
    errors: [],
    events: {
      focusout: onBlur,
    },
  },
  {
    type: 'text',
    placeholder: 'Телефон',
    name: 'phone',
    value: '+7 (909) 967 30 30',
    validation: ValidationRuleNames.phone,
    disabled: true,
    errors: [],
    events: {
      focusout: onBlur,
    },
  },
];
