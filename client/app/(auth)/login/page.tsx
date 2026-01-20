import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth";

const page = () => {
  return (
    <div>
      <Button className="border py-2 px-4" 
      
      onClick={async () => {
        "use server"
        await signIn("google");
      }}
      >
        Signin with google
      </Button>
    </div>
  );
};

export default page;
