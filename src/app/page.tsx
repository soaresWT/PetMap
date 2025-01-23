"use client";
import { Flex, Text, Card, Heading, Link } from "@radix-ui/themes";
import CommonWrapper from "@/components/CommonWrapper";
import Image from "next/image";

export default function Home() {
  return (
    <CommonWrapper>
      <Flex
        direction="column"
        align="center"
        style={{ gap: "2rem", padding: "2rem", backgroundColor: "#f9f9f9" }}
      >
        <Heading weight="bold" style={{ color: "#333", fontSize: "2rem" }}>
          📸 Capture, Localize, Transforme!
        </Heading>
        <Card
          style={{
            width: "100%",
            maxWidth: "800px",
            padding: "2rem",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.6)",
            borderRadius: "10px",
            border: "1px solid #ddd",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
        >
          <Flex
            direction={{ initial: "column", md: "row" }}
            style={{ gap: "1.5rem" }}
          >
            <Image
              src="/Cat2.jpg"
              alt="Imagem de um animal de rua"
              width={400}
              height={600}
              style={{ width: "100%", height: "auto", borderRadius: "10px" }}
            />
            <Text style={{ textAlign: "justify", marginTop: "1rem", color: "#555" }}>
              Nosso sistema conecta pessoas apaixonadas por ajudar animais de
              rua com soluções práticas para transformar suas vidas. Basta tirar
              uma foto do animal de rua, e nós cuidamos do resto. A plataforma
              registra automaticamente a localização e mapeia esses dados,
              criando um retrato detalhado da situação na sua cidade.
            </Text>
          </Flex>
        </Card>
        <Card
          style={{
            width: "100%",
            maxWidth: "800px",
            padding: "2rem",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.6)",
            borderRadius: "10px",
            border: "1px solid #ddd",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
        >
          <Text style={{ textAlign: "justify", color: "#555" }}>
            <strong>O problema dos animais de rua</strong>
            <br />é uma questão urgente que afeta tanto os animais quanto a
            saúde pública. Milhões de cães e gatos vivem abandonados nas ruas,
            representando riscos à saúde e segurança da população. A falta de
            políticas públicas eficazes e infraestrutura adequada dificulta a
            solução desse problema.
          </Text>
        </Card>
        <Card
          style={{
            width: "100%",
            maxWidth: "800px",
            padding: "2rem",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.6)",
            borderRadius: "10px",
            marginTop: "1rem",
            border: "1px solid #ddd",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
        >
          <Text style={{ textAlign: "justify", color: "#555" }}>
            <strong>Por Que Isso Importa?</strong>
            <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
              <li>
                <strong>Saúde Pública: </strong>Animais de rua podem transmitir
                doenças como raiva e leishmaniose.
              </li>
              <li>
                <strong>Bem-Estar Animal: </strong>Muitos desses animais vivem
                em condições precárias e necessitam de ajuda urgente.
              </li>
              <li>
                <strong>Segurança Urbana: </strong>Animais abandonados podem
                causar acidentes e gerar insegurança.
              </li>
            </ul>
            A solução começa com a coleta e mapeamento de informações precisas
            sobre a localização desses animais, permitindo ações mais eficazes e
            rápidas.
          </Text>
        </Card>
        <Card
          style={{
            width: "100%",
            maxWidth: "800px",
            padding: "2rem",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.6)",
            borderRadius: "10px",
            marginTop: "1rem",
            border: "1px solid #ddd",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
        >
          <Text style={{ textAlign: "justify", color: "#555" }}>
            <strong>Por que Participar?</strong>
            <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
              <li>
                🐾 Apoie o Bem-Estar Animal: Facilite ações de resgate e
                cuidados.
              </li>
              <li>
                🗺️ Mapeamento Inteligente: Visualize áreas com maior
                concentração de animais.
              </li>
              <li>
                🤝 Junte-se a uma Comunidade: Faça parte de uma rede
                colaborativa engajada em mudar realidades.
              </li>
            </ul>
          </Text>
        </Card>
        <Card
          style={{
            width: "100%",
            maxWidth: "800px",
            padding: "2rem",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.6)",
            borderRadius: "10px",
            marginTop: "1rem",
            border: "1px solid #ddd",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
        >
          <Text style={{ textAlign: "justify", color: "#555" }}>
            <strong>Como Funciona?</strong>
            <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
              <li>Fotografe: Registre o animal diretamente pelo app.</li>
              <li>Envie: Suba a foto com um clique.</li>
              <li>
                Acompanhe: Veja o mapa crescer com a colaboração de todos.
              </li>
            </ul>
          </Text>
        </Card>
        <Card
          style={{
            width: "100%",
            maxWidth: "800px",
            padding: "2rem",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.6)",
            borderRadius: "10px",
            marginTop: "1rem",
            border: "1px solid #ddd",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
        >
          <Text style={{ textAlign: "justify", color: "#555" }}>
            <strong>Faça Parte da Solução</strong>
            <br />
            Animais de rua precisam de visibilidade, cuidado e apoio. Sua
            participação pode salvar vidas!
            <br />
            <br />
            👉 Comece agora e ajude a transformar o futuro desses animais.
            <br />
            <Link href="/Cadastrar" style={{ color: "#0070f3", textDecoration: "underline" }}>
              Acesse Agora!
            </Link>
          </Text>
        </Card>
      </Flex>
    </CommonWrapper>
  );
}
