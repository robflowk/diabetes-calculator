"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  carbsPer100g: z.coerce.number().min(0.01),
  weight: z.coerce.number().min(0.01),
});

type FormType = z.infer<typeof formSchema>;

export default function Home() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carbsPer100g: 0,
      weight: 0,
    },
  });

  const [submittedValue, setShowResult] = useState<FormType>();

  // 2. Define a submit handler.
  function onSubmit(values: FormType) {
    setShowResult(values);
  }

  return (
    <main className="container max-w-2xl xl:pt-8">
      <Card>
        <CardHeader>
          <CardTitle>Diabetes Easy</CardTitle>
          <CardDescription>
            Brot- und Kohlenhydrateinheiten berechnen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="carbsPer100g"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>100g des Lebensmittel enthalten</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>Gramm Kohlenhydrate</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portion</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>Gramm Kohlenhydrate</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Berechnen
              </Button>
            </form>
          </Form>
          {submittedValue && (
            <>
              <div className="mt-4 p-2 flex justify-center gap-2 font-bold text-xl">
                <div className="p-2 bg-gray-200 rounded">
                  BE: {toBrotEinheit(submittedValue)}
                </div>
                <div className="p-2 bg-gray-200 rounded">
                  KE: {toKohlenhydratEinheit(submittedValue)}
                </div>
              </div>
              <h2 className="text-center font-bold">
                {toKohlenhydrate(submittedValue)}g Kohlenhydrate
              </h2>
              <hr />
              <h3 className="pt-3 text-gray-500 text-sm">
                Berechnungsgrundlage:
              </h3>
              <b>{submittedValue.carbsPer100g}</b> Kohlenhydrate pro 100g <br />
              <b>{submittedValue.weight}</b>g werden gegessen
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

function toKohlenhydrate(value: FormType): string {
  return ((value.carbsPer100g / 100) * value.weight)
    .toFixed(2)
    .replace(".", ",");
}

function toBrotEinheit(value: FormType): string {
  return (((value.carbsPer100g / 100) * value.weight) / 12)
    .toFixed(2)
    .replace(".", ",");
}

function toKohlenhydratEinheit(value: FormType): string {
  return (((value.carbsPer100g / 100) * value.weight) / 10)
    .toFixed(2)
    .replace(".", ",");
}
