package iwo;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet Filter implementation class LoginFilter
 */
public class LoginFilter implements Filter {

    /**
     * Default constructor. 
     */
    public LoginFilter() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub
		// place your code here
		// pass the request along the filter chain
		
		 String reqUrl = ((HttpServletRequest)request).getRequestURL().toString();		 
		 String[] reqUrlStrs = reqUrl.split("/");
		 reqUrl = reqUrlStrs[reqUrlStrs.length-1];
	 
		if(reqUrl.equals("login.html") || reqUrl.equals("login.css")|| reqUrl.equals("swoosh.png")){
			chain.doFilter(request, response);
		}
		else{
			String username = (String)(((HttpServletRequest)request).getParameter("username"));
			String passwd = (String)(((HttpServletRequest)request).getParameter("passwd"));
			
			if(username != null && passwd !=null){
				((HttpServletRequest)request).getSession().setAttribute("username", username);
				((HttpServletRequest)request).getSession().setAttribute("passwd", passwd);
			}
			
			username = (String)(((HttpServletRequest)request).getSession().getAttribute("username"));
			passwd = (String)(((HttpServletRequest)request).getSession().getAttribute("passwd"));
			
			if(username != null && passwd !=null && username.equals("admin") && passwd.equals("admin"))
				chain.doFilter(request, response);
			else
				((HttpServletResponse)response).sendRedirect("login.html");
		}
	}
	
	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
