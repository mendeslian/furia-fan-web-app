import Input from "../Input";
import Button from "../Button";

export default function AuthForm({
  isRecovery,
  onSubmit,
  isLoading,
  // toggleForm,
}) {
  return (
    <form
      className="w-full flex flex-col gap-4 justify-center items-center"
      onSubmit={onSubmit}
    >
      <Input
        name="email"
        label="email"
        required
        placeholder="example@gmail.com"
      />
      {!isRecovery && (
        <Input
          name="password"
          label="password"
          required
          type="password"
          placeholder="0123456789"
        />
      )}

      {/* <div className="w-full flex justify-end">
        <button onClick={toggleForm} type="button">
          <p className="text-sm font-medium cursor-pointer">
            {isRecovery ? "Back to login" : "Forgot your password?"}
          </p>
        </button>
      </div> */}

      <Button fullWidth type="submit" loading={isLoading}>
        {isRecovery ? "Recover" : "Login"}
      </Button>
    </form>
  );
}
