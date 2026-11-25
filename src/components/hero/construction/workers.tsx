import React from "react";
import s from "../ConstructionScene.module.css";
import { EDGE, Place, url } from "./geometry";
import { Figure, HAND, Joint, NEAR_ARM, ShirtDetail, Vest, type Look } from "./rig";

/*
 * The site crew — eight miniature figurine workers, each with its own outfit, pose and task:
 * supervisor (plans), surveyor (level), material handler (toolbox), labourer (shovel), mason (trowel),
 * plasterer (on the scaffold), carpenter (hammering a column form on the roof) and banksman (signalling
 * the crane from the top slab, in time with the lift).
 */

// ---------------------------------------------------------------- outfits ----

const masonLook: Look = {
  skin: "skinA",
  skinShade: "skinAShade",
  shirt: "sage",
  shirtShade: "sageShade",
  rolledSleeves: true,
  cuffLight: "#C3D1AC",
  legs: "beige",
  legsShade: "beigeShade",
  trouserCuff: "#D7C39C",
  boot: "tan",
  bootShade: "tanShade",
  hair: "#2E211A",
  lips: "#6E3A2B",
};

const handlerLook: Look = {
  skin: "skinB",
  skinShade: "skinBShade",
  shirt: "denim",
  shirtShade: "denimShade",
  legs: "charcoal",
  legsShade: "charcoalShade",
  boot: "darkBoot",
  bootShade: "darkBootShade",
  glove: "glove",
  hair: "#1F1814",
  lips: "#5E3024",
};

const supervisorLook: Look = {
  skin: "skinC",
  skinShade: "skinCShade",
  shirt: "khaki",
  shirtShade: "khakiShade",
  legs: "jeans",
  legsShade: "jeansShade",
  boot: "tan",
  bootShade: "tanShade",
  hair: "#2A1E17",
  lips: "#7A4232",
};

const surveyorLook: Look = {
  skin: "skinD",
  skinShade: "skinDShade",
  shirt: "shirtWhite",
  shirtShade: "shirtWhiteShade",
  legs: "charcoal",
  legsShade: "charcoalShade",
  boot: "tan",
  bootShade: "tanShade",
  hair: "#231A14",
  lips: "#6A3628",
};

const labourerLook: Look = {
  skin: "skinA",
  skinShade: "skinAShade",
  shirt: "olive",
  shirtShade: "oliveShade",
  rolledSleeves: true,
  cuffLight: "#8D9B78",
  legs: "jeans",
  legsShade: "jeansShade",
  trouserCuff: "#6E88A2",
  boot: "tan",
  bootShade: "tanShade",
  hair: "#251B15",
  lips: "#6E3A2B",
};

const plastererLook: Look = {
  skin: "skinC",
  skinShade: "skinCShade",
  shirt: "olive",
  shirtShade: "oliveShade",
  legs: "beige",
  legsShade: "beigeShade",
  boot: "darkBoot",
  bootShade: "darkBootShade",
  hair: "#2B1F18",
  lips: "#7A4232",
};

const carpenterLook: Look = {
  skin: "skinB",
  skinShade: "skinBShade",
  shirt: "sage",
  shirtShade: "sageShade",
  legs: "jeans",
  legsShade: "jeansShade",
  boot: "tan",
  bootShade: "tanShade",
  glove: "glove",
  hair: "#1F1814",
  lips: "#5E3024",
};

const banksmanLook: Look = {
  skin: "skinD",
  skinShade: "skinDShade",
  shirt: "denim",
  shirtShade: "denimShade",
  legs: "charcoal",
  legsShade: "charcoalShade",
  boot: "darkBoot",
  bootShade: "darkBootShade",
  glove: "glove",
  hair: "#231A14",
  lips: "#6A3628",
};

// ---------------------------------------------------------------- held items ----

const C = NEAR_ARM;

function Trowel() {
  return (
    <g>
      <rect x={C - 1.3} y={-46} width={2.6} height={6.5} rx={1.1} fill="#B98A57" {...EDGE} />
      <path d={`M${C},-40 L${C},-37`} stroke="#6F7572" strokeWidth={1.4} />
      <path d={`M${C},-37.6 L${C + 5.4},-29.4 L${C},-19.6 L${C - 5.4},-29.4 Z`} fill={url("steel")} {...EDGE} />
      <path d={`M${C - 0.4},-35 L${C - 3.4},-29.6`} stroke="#fff" strokeOpacity={0.55} strokeWidth={0.9} strokeLinecap="round" />
    </g>
  );
}

function Float() {
  return (
    <g>
      <rect x={C - 1.6} y={-46.4} width={3.2} height={4.6} rx={1.2} fill="#B98A57" {...EDGE} />
      <rect x={C - 9} y={-42.2} width={18} height={3.4} rx={1} fill={url("steel")} {...EDGE} />
    </g>
  );
}

function Hammer() {
  return (
    <g>
      <rect x={C - 1.2} y={-47} width={2.4} height={15} rx={1} fill="#B98A57" {...EDGE} />
      <rect x={C - 5.6} y={-34} width={11.2} height={4.6} rx={1} fill="#5E625F" {...EDGE} />
      <rect x={C - 5.6} y={-34} width={11.2} height={1.2} fill="#fff" opacity={0.25} />
    </g>
  );
}

function Toolbox() {
  return (
    <Joint at={[C, -45]} angle={3} anim={s.handlerBox}>
      <path d={`M${C - 4.2},-44.6 Q${C - 4.2},-40.4 ${C},-40.4 Q${C + 4.2},-40.4 ${C + 4.2},-44.6`} stroke="#2E2D2A" strokeWidth={1.8} fill="none" />
      <rect x={C - 13} y={-41.6} width={26} height={15.4} rx={2.4} fill={url("terracotta")} {...EDGE} />
      <rect x={C - 13} y={-41.6} width={26} height={4.6} rx={2.2} fill="#9C5F42" {...EDGE} />
      <rect x={C - 1.8} y={-39.4} width={3.6} height={3.4} rx={0.8} fill="#D7AB58" />
      <path d={`M${C - 11},-31 L${C + 11},-31`} stroke="#fff" strokeOpacity={0.18} strokeWidth={1} />
    </Joint>
  );
}

/** Drawn upright in world axes around the hand: `turn` cancels the arm's pose rotation. */
function Blueprint({ turn }: { turn: number }) {
  const [hx, hy] = HAND;
  return (
    <g transform={`rotate(${turn} ${hx} ${hy})`}>
      <path d={`M${hx + 2},${hy - 11} L${hx + 3.2},${hy + 9} L${hx - 30},${hy + 12.5} L${hx - 31.4},${hy - 7.6} Z`} fill={url("blueprint")} {...EDGE} />
      <g stroke="#EAF2F7" strokeOpacity={0.75} strokeWidth={0.7} fill="none">
        <path d={`M${hx - 24},${hy - 3.5} L${hx - 4},${hy - 5.6} L${hx - 3.2},${hy + 5.4} L${hx - 23.2},${hy + 7.6} Z`} />
        <path d={`M${hx - 14},${hy - 4.5} L${hx - 13.4},${hy + 6.5}`} />
        <path d={`M${hx - 23.6},${hy + 1.8} L${hx - 13.7},${hy + 0.8}`} />
      </g>
      <path d={`M${hx - 31.4},${hy - 7.6} L${hx - 30},${hy + 12.5} L${hx - 34.6},${hy + 13} L${hx - 36},${hy - 7.2} Z`} fill="#6F93AE" {...EDGE} />
      <ellipse cx={hx - 35.4} cy={hy + 2.9} rx={1.8} ry={10.2} fill="#86A7C0" {...EDGE} />
    </g>
  );
}

/** Shovel drawn in world axes around the hand (`turn` cancels the arm's pose), blade loaded with sand. */
function Shovel({ turn }: { turn: number }) {
  const [hx, hy] = HAND;
  return (
    <g transform={`rotate(${turn} ${hx} ${hy})`}>
      <line x1={hx - 20} y1={hy - 18} x2={hx + 18} y2={hy + 26} stroke="#B98A57" strokeWidth={2.4} strokeLinecap="round" />
      <path d={`M${hx - 24},${hy - 20.6} L${hx - 17},${hy - 14.6}`} stroke="#3A3935" strokeWidth={3} strokeLinecap="round" />
      <g transform={`translate(${hx + 17} ${hy + 25}) rotate(49)`}>
        <path d="M0,-5.6 L12,-6.6 Q16.4,0 12,6.6 L0,5.6 Z" fill={url("steel")} {...EDGE} />
        <path d="M2,-5 Q8,-9.6 13,-5 L12,0 Z" fill={url("sand")} />
      </g>
    </g>
  );
}

// ---------------------------------------------------------------- the crew ----

/** Site supervisor — reading the plans, then looking up at the buildings. */
export function Supervisor() {
  const jacket = (
    <g>
      <path d="M-3,-92.6 L2.6,-81.4 L7.8,-92.4 Z" fill="#EEEBE1" {...EDGE} />
      <path d="M-4.6,-92.6 L2.4,-80 L-0.6,-80.6 L-6.4,-90.8 Z" fill="#A98F60" {...EDGE} />
      <path d="M9.4,-92.4 L2.8,-80 L5.6,-80.4 L11,-90.6 Z" fill="#A98F60" {...EDGE} />
      <path d="M2.6,-80 L2.2,-52" stroke="#000" strokeOpacity={0.22} strokeWidth={0.9} />
      <path d="M-13.4,-62.4 L16.4,-62.4 L16.8,-51.4 Q2,-48.6 -13,-51.4 Z" fill={url("khaki")} {...EDGE} />
      <rect x={6.4} y={-84.6} width={7.4} height={6.6} rx={1.1} fill="none" stroke="#000" strokeOpacity={0.18} strokeWidth={0.8} />
      <rect x={8.2} y={-87.6} width={1.6} height={5.6} rx={0.7} fill="#2F2E2B" />
      <rect x={8.4} y={-87.6} width={1.2} height={1.6} fill="#C9CDCB" />
    </g>
  );
  return (
    <Place x={40} z={80}>
      <Figure
        id="worker-three"
        headId="worker-three-head"
        look={supervisorLook}
        pose={{ head: 3, nearShoulder: -22, nearElbow: -72, farShoulder: -30, farElbow: -62, nearHip: -4, farHip: 4 }}
        anim={{
          torso: s.supervisorTorso,
          head: s.supervisorHead,
          nearShoulder: s.supervisorShoulder,
          nearWrist: s.supervisorWrist,
          farShoulder: s.supervisorFarArm,
        }}
        torsoDetail={jacket}
        nearItem={<Blueprint turn={94} />}
      />
    </Place>
  );
}

/** Surveyor — eye to the level, adjusting the focus knob. */
export function Surveyor() {
  return (
    <Place x={128} z={54}>
      <Figure
        id="worker-surveyor"
        look={surveyorLook}
        pose={{ head: 3, torso: 2, nearShoulder: -58, nearElbow: -124, farShoulder: -14, farElbow: -30, nearHip: -4, farHip: 4 }}
        anim={{ head: s.surveyHead, torso: s.surveyTorso, nearWrist: s.surveyWrist }}
        torsoDetail={<ShirtDetail skinShade="skinDShade" collar="#F4F2EC" collarShade="#DAD6CA" />}
      />
    </Place>
  );
}

/** Material handler — carrying a toolbox across the site (faces left). */
export function Handler() {
  return (
    <Place x={262} z={36} mirror>
      <Figure
        id="worker-two"
        nearArmId="worker-two-arm"
        look={handlerLook}
        mustache
        pose={{ torso: -1, head: -2, nearShoulder: 4, nearElbow: -6, farShoulder: -14, farElbow: -34, nearHip: -6, farHip: 7 }}
        anim={{
          torso: s.handlerTorso,
          head: s.handlerHead,
          nearShoulder: s.handlerArm,
          farShoulder: s.handlerFarArm,
          nearHip: s.handlerHip,
          nearKnee: s.handlerKnee,
          nearAnkle: s.handlerAnkle,
        }}
        torsoDetail={<Vest />}
        nearItem={<Toolbox />}
      />
    </Place>
  );
}

/** Labourer — shovelling sand from the pile (faces left). */
export function Labourer() {
  const torso = 14;
  const shoulder = -40;
  const elbow = -36;
  return (
    <Place x={568} z={62} mirror>
      <Figure
        id="worker-labourer"
        look={labourerLook}
        pose={{ torso, head: 6, nearShoulder: shoulder, nearElbow: elbow, farShoulder: -62, farElbow: -46, nearHip: -8, farHip: 10, nearKnee: 6 }}
        anim={{
          torso: s.shovelTorso,
          head: s.shovelHead,
          nearShoulder: s.shovelShoulder,
          nearElbow: s.shovelElbow,
          farShoulder: s.shovelFarShoulder,
        }}
        torsoDetail={<ShirtDetail skinShade="skinAShade" collar="#8D9B78" collarShade="#7D8B69" />}
        nearItem={<Shovel turn={-(torso + shoulder + elbow)} />}
      />
    </Place>
  );
}

/** Mason — trowelling mortar onto the half-built wall. */
export function Mason() {
  const belt = (
    <g>
      <ShirtDetail skinShade="skinAShade" />
      <g transform="rotate(14 17 -64)">
        <rect x={15.8} y={-70} width={2.4} height={11} rx={1} fill="#B98A57" {...EDGE} />
        <rect x={13.4} y={-72} width={7.4} height={3.2} rx={1} fill="#6F7572" {...EDGE} />
      </g>
      <path d="M9.6,-58.2 L19.4,-58.2 L18.8,-46.2 Q14.6,-43.6 10.2,-46.2 Z" fill={url("leather")} {...EDGE} />
      <path d="M9.8,-55 L19.2,-55" stroke="#000" strokeOpacity={0.2} strokeWidth={0.8} />
    </g>
  );
  return (
    <Place x={700} z={92}>
      <Figure
        id="worker-one"
        nearArmId="worker-one-arm"
        look={masonLook}
        beard
        pose={{ torso: 4, head: 5, nearShoulder: -70, nearElbow: -32, nearWrist: 22, farShoulder: 12, farElbow: -24, nearHip: -6, farHip: 6 }}
        anim={{
          torso: s.masonTorso,
          head: s.masonHead,
          nearShoulder: s.masonShoulder,
          nearElbow: s.masonElbow,
          nearWrist: s.masonWrist,
          farShoulder: s.masonFarArm,
        }}
        torsoDetail={belt}
        nearItem={<Trowel />}
      />
    </Place>
  );
}

/** Plasterer — on the scaffold, floating fresh render onto the blockwork (faces left). */
export function Plasterer() {
  return (
    <Place x={200} y={192} z={158} mirror>
      <Figure
        id="worker-plasterer"
        look={plastererLook}
        mustache
        pose={{ torso: -2, head: -6, nearShoulder: -100, nearElbow: -16, nearWrist: -18, farShoulder: -10, farElbow: -30 }}
        anim={{
          torso: s.plasterTorso,
          nearShoulder: s.plasterShoulder,
          nearElbow: s.plasterElbow,
          nearWrist: s.plasterWrist,
        }}
        torsoDetail={<ShirtDetail skinShade="skinCShade" collar="#8D9B78" collarShade="#7D8B69" />}
        nearItem={<Float />}
      />
    </Place>
  );
}

/** Carpenter — hammering the column form on building A's roof. */
export function Carpenter() {
  return (
    <Place x={298} y={300} z={214}>
      <Figure
        id="worker-carpenter"
        look={carpenterLook}
        pose={{ torso: 6, head: 8, nearShoulder: -58, nearElbow: -52, farShoulder: -48, farElbow: -50, nearHip: -6, farHip: 8 }}
        anim={{ torso: s.hammerTorso, head: s.hammerHead, nearShoulder: s.hammerShoulder, nearElbow: s.hammerElbow }}
        torsoDetail={<Vest shirtV="#8A9B70" />}
        nearItem={<Hammer />}
      />
    </Place>
  );
}

/** Banksman — directing the crane from building B's top slab, in time with the lift. */
export function Banksman() {
  return (
    <Place x={520} y={396} z={172}>
      <Figure
        id="worker-banksman"
        look={banksmanLook}
        pose={{ head: -5, nearShoulder: -120, nearElbow: -12, farShoulder: 6, farElbow: -14, nearHip: -3, farHip: 3 }}
        anim={{ head: s.signalHead, nearShoulder: s.signalShoulder, nearElbow: s.signalElbow }}
        torsoDetail={<Vest />}
      />
    </Place>
  );
}
