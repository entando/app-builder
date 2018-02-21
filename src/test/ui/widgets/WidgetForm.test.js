import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { WidgetFormBody } from 'ui/widgets/WidgetForm';

const handleSubmit = jest.fn();

describe('WidgetForm', () => {
  let widgetForm = null;
  let submitting;
  let touched;
  let error;
  let invalid;

  beforeEach(() => {
    submitting = false;
    touched = false;
    invalid = false;
    error = null;
  });
  const buildWidgetForm = () => {
    const props = {
      submitting,
      invalid,

      fields: {
        widgetTypeCode: {
          value: 'test_widget',
          touched,
          error,
        },
      },
      handleSubmit,
    };
    return shallow(<WidgetFormBody {...props} />);
  };

  it('disables submit button while submitting', () => {
    submitting = true;
    widgetForm = buildWidgetForm();
    const submitButton = widgetForm.find('button[type="submit"]');
    expect(submitButton.props().disabled).toEqual(true);
  });

  it('disables submit button if form is invalid', () => {
    invalid = true;
    widgetForm = buildWidgetForm();
    const submitButton = widgetForm.find('button[type="submit"]');
    expect(submitButton.props().disabled).toEqual(true);
  });
});
/*

  context('when submitting', () => {


    context('when server returns an error', () => {
      beforeEach(() => {
        onSaveResponse = Promise.reject('some rejection');
      });

      it('throws a SubmissionError on error in the form submit handler', () => {
        let promiseReturnedFromFormHandler;
        handleSubmit = fn => function () {
          // In this test, we know arguments will be empty because we
          // control it in our test when we simulate the submit, and
          // don't pass it any arguments. But it's just good practice to
          // pass them along.
          promiseReturnedFromFormHandler = fn(arguments);
        };
        subject = buildSubject();
        subject.find('form').simulate('submit');
        expect(onSave.callCount).to.equal(1);
        return promiseReturnedFromFormHandler.then(() => {
          throw new Error("Submission error should have been checked but wasn't");
        }).catch((error) => {
          expect(error).to.be.instanceof(SubmissionError);
        });
      });

      it('alternative approach to previous test - throws a SubmissionError on error in the form submit handler', () => {
        subject = buildSubject();
        const promiseReturnedFromFormHandler = subject.instance().mySubmit({ firstName: 'somename' });
        return promiseReturnedFromFormHandler.then(() => {
          throw new Error('Should not hit this then block - test was set up incorrectly');
        }).catch((error) => {
          expect(error).to.be.instanceof(SubmissionError);
        });
      });
    });
  });
});

describe('RenderTextInput', () => {
  let widgetTypeCode;

  it('render error message for widgetTypeCode', () => {
    const input = { name: 'widgetTypeCode', value: '' };
    const label = 'Code';
    const meta = { touched: true, error: 'Required' };
    const element = RenderTextInput({ input, label, meta });
    widgetTypeCode = shallow(element);
    const firstNameHelpBlock = widgetTypeCode.find('.help-block').first();
    expect(firstNameHelpBlock.exists()).toEqual(true);
    expect(firstNameHelpBlock.text()).toEqual('Required');
  });
});
*/
