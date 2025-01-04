import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QUERY_KEYS } from "@/constants/query-keys";
import { getUserId } from "@/lib/utils";
import conversationService from "@/services/conversation";
import { selectUserData } from "@/store/features/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
});

export const CreateConversation = () => {
  const { user } = useSelector(selectUserData);
  const userId = getUserId(user);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email || "",
      name: user?.name ? `${user?.name} ${user?.surname}` : "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: conversationService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER_CONVERSATION],
      });
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    mutate({
      userEmail: data.email,
      userName: data.name,
      userId,
    });
  }
  return (
    <div>
      <h1 className="text-muted-foreground text-2xl font-semibold mt-3">
        Need help? Start a conversation.
      </h1>
      <p className="my-3 text-primary">
        Fill out the form below and we will get back to you as soon as possible
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input disabled={!!user} placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={!!user}
                    placeholder="name@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit" disabled={isPending}>
            Start Conversation
          </Button>
        </form>
      </Form>
    </div>
  );
};
