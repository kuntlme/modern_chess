import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth";

const page = () => {
  return (
    <div>
      <Button
        className="border px-4 py-2"
        onClick={async () => {
          "use server";
          await signIn("google");
        }}
      >
        Signin with google
      </Button>
    </div>
  );
};

export default page;
