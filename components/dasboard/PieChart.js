import { Pie } from "vue-chartjs";

export default {
    props:['data'],
    extends: Pie,
    mounted() {
        this.gradient = this.$refs.canvas
            .getContext("2d")
            .createLinearGradient(0, 0, 0, 450);
        this.gradient2 = this.$refs.canvas
            .getContext("2d")
            .createLinearGradient(0, 0, 0, 450);
        
        this.gradient3 = this.$refs.canvas
            .getContext("2d")
            .createLinearGradient(0, 0, 0, 450);
        
        this.gradient4 = this.$refs.canvas
            .getContext("2d")
            .createLinearGradient(0, 0, 0, 450);
        
        this.gradient5 = this.$refs.canvas
            .getContext("2d")
            .createLinearGradient(0, 0, 0, 450);

        this.gradient.addColorStop(0, "rgb(247,204,217)");
        this.gradient.addColorStop(0.5, "rgb(135,122,157)");
        this.gradient.addColorStop(1, "rgb(32,45,101)");

        this.gradient2.addColorStop(0, "rgb(169,7,107)");
        this.gradient2.addColorStop(0.5, "rgb(133,5,101)");
        this.gradient2.addColorStop(1, "rgb(97,4,95)");

        this.gradient3.addColorStop(0, "rgba(0, 231, 255, 0.9)");
        this.gradient3.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
        this.gradient3.addColorStop(1, "rgba(0, 231, 255, 0)");

        // this.gradient3.addColorStop(0, "rgba(0, 240, 270, 0.9)");
        // this.gradient3.addColorStop(0.5, "rgba(0, 250, 10, 0.25)");
        // this.gradient3.addColorStop(1, "rgba(0, 236, 21, 0)");
        

        this.gradient4.addColorStop(0, "rgba(255, 99, 71, 0.2");
        this.gradient4.addColorStop(0.5, "rgba(255, 99, 71, 0.6)");
        this.gradient4.addColorStop(1, "rgba(255, 99, 71, 1)");

        this.gradient5.addColorStop(0, "rgb(128,211,203)");
        this.gradient5.addColorStop(0.5, "rgb(67,145,161)");
        this.gradient5.addColorStop(1, "rgb(10,83,122)");


        this.renderChart(
            {
                labels: ["Chờ xác nhận", "Đã xác nhận", "Đang vận chuyển", "Đã nhận hàng", "Hoàn hàng"],
                datasets: [
                    {
                        backgroundColor: [this.gradient, this.gradient2, this.gradient3, this.gradient4, this.gradient5],
                        data: this.data
                    }
                ]
            },
            { responsive: true, maintainAspectRatio: false }
        );
    }
};