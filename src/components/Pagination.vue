<template>
    <section class="section is-small">
        <b-pagination
            :total="totalPage"
            :current.sync="current"
            :range-before="rangeBefore"
            :range-after="rangeAfter"
            :order="order"
            :size="size"
            :simple="isSimple"
            :rounded="isRounded"
            :per-page="perPage"
            aria-page-label="Page"
            aria-current-label="Current page"
            @change="changePage"
        >
        </b-pagination>
    </section>
</template>

<script>
import {mapGetters} from 'vuex'
    export default {
        computed:mapGetters(['totalPage']),
        data() {
            return {
                current: 1,
                perPage: 10,
                rangeBefore: 3,
                rangeAfter: 1,
                order: 'is-centered',
                size: '',
                isSimple: false,
                isRounded: false
            }
        },
        methods:{
            changePage(currentPage){
                this.$store.commit('changePage',currentPage)
            }
        }
    }
</script>


<style lang="scss">

.pagination{
    &-next, &-previous{
        display: none!important;
    }
}

</style>