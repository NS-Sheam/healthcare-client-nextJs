import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFormConfig = {
  resolver?: any;
  defaultValues?: Record<string, unknown>;
};

type TFormProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TFormConfig;

const PHForm = ({ children, onSubmit, resolver, defaultValues }: TFormProps) => {
  const formConfig: TFormConfig = {};
  if (resolver) {
    formConfig.resolver = resolver;
  }
  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }
  const methods = useForm(formConfig);
  const { handleSubmit } = methods;
  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default PHForm;
