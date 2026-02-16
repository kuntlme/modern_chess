"use client";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { completeOnboarding } from "../action";
import { OnboardingInput, onboardingSchema } from "../schema";

const OnboardingForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<OnboardingInput>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      username: "",
      country: "",
    },
  });

  const onSubmit = async (data: OnboardingInput) => {
    try {
      const result = await completeOnboarding(data);

      if (result?.error) {
        setError("username", { message: result.error });
        return;
      }
      router.refresh();
      router.push("/dashboard");
    } catch (error) {
      throw new Error("something went wrong");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldLegend>Complete Your Account</FieldLegend>
        <FieldDescription>
          Make your identity all over the world
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              type="text"
              placeholder="enter a extraordinary username here"
              {...register("username")}
              className="bg-background"
            />

            {errors.username && (
              <FieldError>{errors.username.message}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel>Select your country</FieldLabel>
            <Select onValueChange={(value) => setValue("country", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="China">China</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.country && (
              <FieldError>{errors.country.message}</FieldError>
            )}
          </Field>
        </FieldGroup>
        <Field>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Field>
      </FieldSet>
    </form>
  );
};

export default OnboardingForm;
