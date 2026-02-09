import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="not-found">
      <div className="not-found-card">
        <p className="not-found-code">404</p>
        <h2 className="not-found-title">Page Not Found</h2>
        <p className="not-found-text">
          The requested URL doesn&apos;t exist or has been moved.
        </p>
        <Button
          type="button"
          className="not-found-action"
          onClick={() => navigate("/", { replace: true })}
        >
          Back to Home
        </Button>
      </div>
    </section>
  );
}
