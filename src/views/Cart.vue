<script setup>
import { getItems, removeItem } from '@/services/cartService';
import { reactive, onMounted, computed } from 'vue';

// 반응형 상태
const state = reactive({
  items: [],
});

let sum = 0;
const totalPrice = computed(() => {
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

const remove = async (id) => {
  const params = { id };
  if (!confirm('삭제?')) {
    return;
  }
  console.log('itemId', params);
  const res = await removeItem(params);

  if (res === undefined || res.status != 200) {
    return;
  }
  alert('삭제 완');
  sum = 0;
  load();
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
        <div class="act">
          <router-link to="/order" class="btn btn-primary"
            >주문하기</router-link
          >
        </div>
        <div>합계 : {{ totalPrice.toLocaleString() }}원</div>
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
