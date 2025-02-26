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
        style={{
          gap: "1rem",
          padding: "1rem",
          marginTop: "1rem",
          backgroundColor: "var(--secondary-pink)",
        }}
      >
        <Heading weight="bold">📸 Capture, Localize, Transforme!</Heading>
        <Card
          variant="classic"
          style={{
            width: "100%",
            maxWidth: "800px",
            padding: "1rem",
            backgroundColor: "var(--white)",
          }}
        >
          <Flex
            direction={{ initial: "column", md: "row" }}
            style={{ gap: "1rem" }}
          >
            <Image
              src="/Cat2.jpg"
              alt="Imagem de um animal de rua"
              width={400}
              height={600}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
            <Text style={{ textAlign: "justify", marginTop: "1rem" }}>
              Nosso sistema conecta pessoas apaixonadas por ajudar animais de
              rua com soluções práticas para transformar suas vidas. Basta tirar
              uma foto do animal de rua, e nós cuidamos do resto. A plataforma
              registra automaticamente a localização e mapeia esses dados,
              criando um retrato detalhado da situação na sua cidade.
            </Text>
          </Flex>
        </Card>
        <Card style={{ width: "100%", maxWidth: "800px", padding: "1rem" }}>
          <Text style={{ textAlign: "justify" }}>
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
            padding: "1rem",
            marginTop: "1rem",
          }}
        >
          <Text style={{ textAlign: "justify" }}>
            <strong>Por Que Isso Importa?</strong>
            <ul>
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
            padding: "1rem",
            marginTop: "1rem",
          }}
        >
          <Text style={{ textAlign: "justify" }}>
            <strong>Por que Participar?</strong>
            <ul>
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
            padding: "1rem",
            marginTop: "1rem",
          }}
        >
          <Text style={{ textAlign: "justify" }}>
            <strong>Como Funciona?</strong>
            <ul>
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
            padding: "1rem",
            marginTop: "1rem",
          }}
        >
          <Text style={{ textAlign: "justify" }}>
            <strong>Faça Parte da Solução</strong>
            <br />
            Animais de rua precisam de visibilidade, cuidado e apoio. Sua
            participação pode salvar vidas!
            <br />
            <br />
            👉 Comece agora e ajude a transformar o futuro desses animais.
            <br />
            <Link href="/Cadastrar">Acesse Agora!</Link>
          </Text>
        </Card>
      </Flex>
    </CommonWrapper>
  );
}
