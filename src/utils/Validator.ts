export enum ValidationRuleNames {
  email = 'email',
  name = 'name',
  login = 'login',
  password = 'password',
  phone = 'phone',
  required = 'required',
}

type Rule = {
  rule: (val: string) => boolean;
  message: string;
};
type ValidationRules = { [key in keyof typeof ValidationRuleNames]: Rule };

class Validator {
  private rules: ValidationRules = {
    login: {
      rule: (val: string) => this.testRegex(val, /^(?=.*[a-zA-Z])[\w-]{3,20}$/),
      message: 'Логин должен состоять из латинских букв и цифр, также допустимы символы _ и -',
    },
    name: {
      rule: (val: string) => this.testRegex(val, /^[А-ЯЁA-Z]+[А-ЯЁA-Zа-яёa-z-]+$/),
      message: 'Допустимы символы латиницы и кириллицы, а также дефис',
    },
    email: {
      rule: (val: string) => this.testRegex(val, /^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
      message: 'Некорректный адрес почты',
    },
    password: {
      rule: (val: string) => this.testRegex(val, /^(?=.*\d)(?=.*[A-Z]).{8,40}$/),
      message: 'Пароль должен содержать одну заглавную букву и одну цифру',
    },
    phone: { rule: (val: string) => this.testRegex(val, /^^\+?\d{10,15}$/), message: 'Некорректный номер телефона' },
    required: { rule: (val: string) => !this.isBlank(val), message: 'Значение не должно быть пустым' },
  };

  public messages(value: string, rules: ValidationRuleNames[]): string[] {
    const messages: string[] = [];

    rules.forEach((rule) => {
      if (this.rules[rule]) {
        if (!this.rules[rule].rule(value)) {
          messages.push(this.rules[rule].message);
        }
      } else {
        console.error(`Rule Not Found: There is no rule with the name ${rule}.`);
      }
    });

    return messages;
  }

  private isBlank(value?: string) {
    return this.testRegex(value ?? '', /^[\s]*$/);
  }

  private testRegex(value: string, regex: RegExp): boolean {
    return regex.test(value);
  }
}

export const validator = new Validator();
