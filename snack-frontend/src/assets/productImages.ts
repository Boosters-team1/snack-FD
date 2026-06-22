import coke from "./images/coke.png";
import cokezero from "./images/cokezero.png";

// 상품 id → 로컬 이미지 매핑. 서버 imageUrl보다 우선 적용됩니다.
// 새 상품은 import 후 아래 맵에 한 줄씩 추가하세요.
export const productImages: Record<number, string> = {
  1: coke, // 음료 > 청량/탄산음료 > 코카콜라 제로
  2: cokezero, // 음료 > 청량/탄산음료 > 펩시 제로
};
