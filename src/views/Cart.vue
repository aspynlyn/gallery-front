<script setup>
import { getItems, removeItem, clearItem } from '@/services/cartService';
import { reactive, onMounted, computed } from 'vue';

// 반응형 상태
const state = reactive({
  items: [],
});

const totalPrice = computed(() => {
  let sum = 0;
  state.items.forEach((i) => {
    sum += i.price - (i.price * i.discountPer) / 100;
  });
  return sum;
});

// 장바구니 상품 조회
const load = async () => {
  const res = await getItems();

  if (res === undefined || res.status != 200) {
    return;
  }
  console.log('res.data', res.data);
  state.items = res.data;
};

const remove = async (cart_id) => {
  if (!confirm('삭제?')) {
    return;
  }
  console.log('cartId', cart_id);
  const res = await removeItem(cart_id);

  if (res === undefined || res.status != 200) {
    return;
  }
  alert('삭제 완');
  console.log('객체', res.data);
  load();
};

const clear = async () => {
  if (!confirm('다 삭제 할겨?')) {
    return;
  }
  const res = await clearItem();
  if (res === undefined || res.status != 200) {
    return;
  }
  alert('모두 삭제 완');
  console.log('객체', res.data);
  state.items = [];
};

onMounted(() => {
  load();
});
</script>

<template>
  <div class="cart">
    <div class="container">
      <template v-if="state.items.length">
        <ul class="items">
          <li v-for="i in state.items">
            <img :src="`pic/item/${i.imgPath}`" alt="`상품 사진(${i.name})" />
            <b class="name">{{ i.name }}</b>
            <span class="price"
              >{{
                (i.price - (i.price * i.discountPer) / 100).toLocaleString()
              }}원</span
            >
            <span class="remove float-end" @click="remove(i.id)" title="삭제"
              >&times;</span
            >
          </li>
        </ul>
        <div class="total">
          <b>총액 : </b>
          <span>{{ totalPrice.toLocaleString() }}원</span>
        </div>
        <div class="act d-flex justify-content-around">
          <button class="btn btn-danger" @click="clear">장바구니 비우기</button>
          <router-link to="/order" class="btn btn-primary"
            >주문하기</router-link
          >
        </div>
      </template>
      <div class="text-center py-5" v-else>장바구니가 비어있습니다</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart {
  .items {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      border: 1px solid #eee;
      margin-top: 25px;
      margin-bottom: 25px;
    }
    img {
      width: 150px;
      height: 150px;
    }
    .name {
      margin-left: 25px;
    }
    .price {
      margin-left: 25px;
    }
    .remove {
      cursor: pointer;
      font-size: 20px;
      padding: 5px 15px;
    }
  }

  .act .btn {
    width: 300px;
    display: block;
    margin: 0 auto;
    padding: 30px 50px;
    font-size: 20px;
  }
}
</style>
