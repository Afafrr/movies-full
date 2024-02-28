export const AuthError = ({ mess }: { mess: string }) => {
  return <div className="alert bg-danger">{mess}</div>;
};
