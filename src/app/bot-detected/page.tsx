import BotdResult from "@/components/bot-result";
import Container from "@/components/container";

export default function BlockedPage() {
  return (
    <Container className="min-h-[100vh] mt-10">
      <h5 className="mb-6 text-center">
        Bot Protection with Botd (by FingerprintJS)
      </h5>
      <BotdResult isBot />
    </Container>
  );
}
