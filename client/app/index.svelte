<Header/>
<Gauges />
<Services />
<Disks />
<footer></footer>

<script>
import Header from '../header';
import Gauges from '../gauges';
import Disks from '../disks';
import Services from '../services';

window.addEventListener('orientationchange', () => {
	setTimeout(() => location.reload(), 300);
});
</script>
